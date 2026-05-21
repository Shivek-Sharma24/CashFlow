import { Trash2 } from "lucide-react"
import { type Expense } from "../../Zustand/useFetchExpenses"
import { useFetchExpense } from "@/Zustand/useFetchExpenses"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Spinner } from "../ui/spinner"
export const api = "http://localhost:5200"
import useMonthlyData from "@/Zustand/useMonthlyData"
import useBarChart from "@/Zustand/useGetBarChart"
import useGetPieChart from "@/Zustand/useGetPieChart"

const categoryConfig: Record<
  Expense["category"],
  { border: string; iconBg: string; badgeBg: string; badgeColor: string; icon: string }
> = {
  Food:          { border: "#1D9E75", iconBg: "#E1F5EE", badgeBg: "#E1F5EE", badgeColor: "#0F6E56", icon: "🍴" },
  Entertainment: { border: "#AFA9EC", iconBg: "#EEEDFE", badgeBg: "#EEEDFE", badgeColor: "#534AB7", icon: "🎮" },
  Travel:        { border: "#EF9F27", iconBg: "#FAEEDA", badgeBg: "#FAEEDA", badgeColor: "#854F0B", icon: "✈️" },
  Shopping:      { border: "#F0997B", iconBg: "#FAECE7", badgeBg: "#FAECE7", badgeColor: "#993C1D", icon: "🛍️" },
  Health:        { border: "#60A5FA", iconBg: "#EFF6FF", badgeBg: "#EFF6FF", badgeColor: "#1D4ED8", icon: "💊" },
  Other:         { border: "#A1A1AA", iconBg: "#F4F4F5", badgeBg: "#F4F4F5", badgeColor: "#52525B", icon: "📦" },
}
function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day:   "numeric",
    month: "short",
  })
}
export function ExpenseCard({ expense }: { expense: Expense }) {
  const [loading , setloading] = useState(false);
  const deleteExpense = useFetchExpense((s) => s.deleteExpense)
  const config        = categoryConfig[expense.category]

  const handleDelete = async () => {
    setloading(true)
    try {
      await fetch(`${api}/delete/${expense._id}`, {
        method:  "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      deleteExpense(expense._id)
      setloading(false)
      setTimeout(() => {
        useMonthlyData.getState().fetchMonthlyStats();
        useBarChart.getState().fetchWeeklyData();
        useGetPieChart.getState().fetchCategoryData();
      }, 500);
    } catch (err) {
      console.error("Delete failed:", err)
    }
  }

  return (
    <div
      className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-3 group transition-all duration-150 hover:border-zinc-600"
      style={{ borderLeft: `3px solid ${config.border}`, borderRadius: "0 12px 12px 0" }}
    >
      {/* Category icon */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
        style={{ background: config.iconBg }}
      >
        {config.icon}
      </div>

      {/* Name + category badge + date */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-zinc-100 truncate">
          {expense.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{ background: config.badgeBg, color: config.badgeColor }}
          >
            {expense.category}
          </span>
          <span className="text-[11px] text-zinc-500">
            {formatDate(expense.date)}
            {expense.time && ` · ${expense.time}`}
          </span>
        </div>
      </div>

      {/* Amount + delete button */}
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <span className="text-sm font-medium text-zinc-100">
          ₹{expense.amount.toLocaleString("en-IN")}
        </span>
        <button
          onClick={handleDelete}
          aria-label="Delete expense"
          className={cn(
            "w-6 h-6 rounded-md border border-zinc-700 bg-zinc-800",
            "flex items-center justify-center text-zinc-500",
            "cursor-pointer transition-all duration-150",
            "hover:bg-red-950 hover:border-red-700 hover:text-red-400"
          )}
        >
          {loading ? <Spinner className="size-2"/> :<Trash2 size={12} />}
        </button>
      </div>
    </div>
  )
}