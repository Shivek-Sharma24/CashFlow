import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  // DialogDescription,
  // DialogClose,
  // DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import useAddExpense from "@/Zustand/useAddExpense";
import { useFetchExpense } from "@/Zustand/useFetchExpenses";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category =
  | "Food"
  | "Entertainment"
  | "Travel"
  | "Shopping"
  | "Health"
  | "Other";

// interface ExpenseForm {
//   name: string;
//   amount: string;
//   category: Category | "";
//   date: string;
//   time: string;
// }

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORIES: {
  value: Category;
  icon: string;
  activeBg: string;
  activeBorder: string;
  activeText: string;
}[] = [
  {
    value: "Food",
    icon: "🍴",
    activeBg: "#0D2B1F",
    activeBorder: "#1D9E75",
    activeText: "#4ADE80",
  },
  {
    value: "Entertainment",
    icon: "🎮",
    activeBg: "#1A1840",
    activeBorder: "#AFA9EC",
    activeText: "#A5B4FC",
  },
  {
    value: "Travel",
    icon: "✈️",
    activeBg: "#2B1F07",
    activeBorder: "#EF9F27",
    activeText: "#FCD34D",
  },
  {
    value: "Shopping",
    icon: "🛍️",
    activeBg: "#2B1008",
    activeBorder: "#F0997B",
    activeText: "#FCA5A5",
  },
  {
    value: "Health",
    icon: "💊",
    activeBg: "#0F1E2B",
    activeBorder: "#60A5FA",
    activeText: "#93C5FD",
  },
  {
    value: "Other",
    icon: "📦",
    activeBg: "#1C1C1C",
    activeBorder: "#A1A1AA",
    activeText: "#D4D4D8",
  },
];

// ─── Add Expense Dialog ───────────────────────────────────────────────────────

export default function AddExpenseDialog() {
  const [open, setOpen] = useState(false);
  // const [form, setForm] = useState<ExpenseForm>({
  //   name: "",
  //   amount: "",
  //   category: "",
  //   date: new Date().toISOString().split("T")[0],
  //   time: new Date().toTimeString().slice(0, 5),
  // });
  // const [errors, setErrors] = useState<Partial<ExpenseForm>>({});

  // const validate = () => {
  //   const e: Partial<ExpenseForm> = {};
  //   if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
  //     e.amount = "Enter a valid amount";
  //   if (!form.name.trim()) e.name = "Expense name is required";
  //   if (!form.category) e.category = "Select a category" as Category;
  //   return e;
  // };

  // const handleSubmit = () => {
  //   const errs = validate();
  //   if (Object.keys(errs).length > 0) {
  //     setErrors(errs);
  //     return;
  //   }

  //   // 👇 Replace this with your Zustand store action
  //   console.log("New expense:", form);

  //   // Reset and close
  //   setForm({
  //     name: "",
  //     amount: "",
  //     category: "",
  //     date: new Date().toISOString().split("T")[0],
  //     time: new Date().toTimeString().slice(0, 5),
  //   });
  //   setErrors({});
  //   setOpen(false);
  // };

  // const handleReset = () => {
  //   setForm({
  //     name: "",
  //     amount: "",
  //     category: "",
  //     date: new Date().toISOString().split("T")[0],
  //     time: new Date().toTimeString().slice(0, 5),
  //   });
  //   setErrors({});
  // };
  const { handleChange, handleReset, handleSubmit, errors, form } =
    useAddExpense(); // 👈 Replace with your Zustand store hook
  const { fetchExpenses } = useFetchExpense();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger button */}
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs h-8 px-3 gap-1.5"
        >
          <Plus size={14} />
          Add expense
        </Button>
      </DialogTrigger>

      {/* Dialog */}
      <DialogContent className="bg-zinc-900 border border-zinc-800 text-zinc-100 p-0 gap-0 min-w-[400px]  rounded-2xl overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-5 pt-5 pb-4 border-b border-zinc-800">
          <DialogTitle className="text-base font-medium text-zinc-100">
            Add expense
          </DialogTitle>
          <p className="text-xs text-zinc-500 mt-0.5">
            Fill in the details below to log a new expense
          </p>
        </DialogHeader>

        {/* Body */}
        <div className="p-4 w-full flex flex-col gap-5 min-w-[390px]">
          {/* Amount */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-medium text-zinc-400">Amount</Label>
            <div
              className={cn(
                "flex items-center gap-2 bg-zinc-800 border rounded-xl px-4 h-14 transition-colors",
                errors.amount
                  ? "border-red-600"
                  : "border-zinc-700 focus-within:border-emerald-600",
              )}
            >
              <span className="text-xl text-zinc-500 font-light">₹</span>
              <input
                type="number"
                placeholder="0"
                name="amount"
                value={form.amount}
                onChange={() => handleChange("amount", form.amount)}
                className="flex-1 bg-transparent text-2xl font-medium text-zinc-100 outline-none placeholder:text-zinc-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            {errors.amount && (
              <p className="text-xs text-red-400">{errors.amount}</p>
            )}
          </div>

          {/* Expense name */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-medium text-zinc-400">
              Expense name
            </Label>
            <Input
              placeholder="e.g. Lunch, Netflix, Cab fare..."
              name="name"
              value={form.name}
              onChange={() => handleChange("name", form.name)}
              className={cn(
                "bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 rounded-xl h-10 focus-visible:ring-0 focus-visible:border-emerald-600 transition-colors",
                errors.name && "border-red-600",
              )}
            />
            {errors.name && (
              <p className="text-xs text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-medium text-zinc-400">
              Category
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = form.category === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => {
                      handleChange("category", cat.value);
                    }}
                    className={cn(
                      "flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-medium transition-all duration-150",
                      isActive
                        ? "border-opacity-100"
                        : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500",
                    )}
                    style={
                      isActive
                        ? {
                            background: cat.activeBg,
                            borderColor: cat.activeBorder,
                            color: cat.activeText,
                          }
                        : {}
                    }
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <span>{cat.value}</span>
                  </button>
                );
              })}
            </div>
            {errors.category && (
              <p className="text-xs text-red-400">{errors.category}</p>
            )}
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-zinc-400">Date</Label>
              <Input
                type="date"
                name="date"
                value={form.date}
                onChange={() => handleChange("date", form.date)}
                className="bg-zinc-800 border-zinc-700 text-zinc-100 rounded-xl h-10 focus-visible:ring-0 focus-visible:border-emerald-600 transition-colors [color-scheme:dark]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-zinc-400">Time</Label>
              <Input
                type="time"
                name="time"
                value={form.time}
                onChange={() => handleChange("time", form.time)}
                className="bg-zinc-800 border-zinc-700 text-zinc-100 rounded-xl h-10 focus-visible:ring-0 focus-visible:border-emerald-600 transition-colors [color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-red-400 transition-colors"
          >
            <Trash2 size={13} />
            Clear
          </button>
          <div className="flex-1" />
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            // className="border-zinc-700 bg-transparent text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 rounded-xl text-sm"
            className="
    border-zinc-700
    bg-transparent
    text-zinc-400
    hover:bg-zinc-800
    hover:text-zinc-200
    rounded-xl
    text-sm
    w-full sm:w-auto
  "
          >
            Cancel
          </Button>
          <Button
            onClick={() =>
              handleSubmit(() => {
                const currentMonth = new Date()
                  .toLocaleString("default", { month: "long" })
                  .toLowerCase();
                const currentYear = new Date().getFullYear();
                fetchExpenses(1, currentMonth, currentYear);
                setOpen(false);
              })
            }
            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm px-5"
          >
            Add expense
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
