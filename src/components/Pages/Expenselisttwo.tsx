import { useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"
import { useFetchExpense, useFilteredExpenses, type Expense } from "../../Zustand/useFetchExpenses"
import { ExpenseCard } from "./ExpenseCard"

export const api = "http://localhost:5200"

// ─── Types ────────────────────────────────────────────────────────────────────

type ExpenseGroup = "Today" | "Yesterday" | "Earlier"

// ─── Helper — group expenses into Today / Yesterday / Earlier ─────────────────

function groupExpenses(expenses: Expense[]): Record<ExpenseGroup, Expense[]> {
  const today     = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  const fmt = (d: Date) => d.toISOString().split("T")[0]

  const groups: Record<ExpenseGroup, Expense[]> = {
    Today:     [],
    Yesterday: [],
    Earlier:   [],
  }

  expenses.forEach((e) => {
    const expDate = fmt(new Date(e.date))
    if (expDate === fmt(today))          groups.Today.push(e)
    else if (expDate === fmt(yesterday)) groups.Yesterday.push(e)
    else                                 groups.Earlier.push(e)
  })

  return groups
}

 function sumAmount(expenses: Expense[]): string {
  return expenses
    .reduce((sum, e) => sum + e.amount, 0)
    .toLocaleString("en-IN")
}

// Group divider — label + subtotal + line
function GroupDivider({ label, expenses }: { label: string; expenses: Expense[] }) {
  return (
    <div className="flex items-center gap-3 my-3">
      <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider shrink-0">
        {label}
      </span>
      <span className="text-[11px] text-zinc-600">
        · ₹{sumAmount(expenses)}
      </span>
      <div className="flex-1 h-px bg-zinc-800" />
    </div>
  )
}

// Group section — renders divider + maps expense cards
function ExpenseGroupSection({ label, expenses }: { label: string; expenses: Expense[] }) {
  if (expenses.length === 0) return null
  return (
    <div className="mb-2">
      <GroupDivider label={label} expenses={expenses} />
      <div className="flex flex-col gap-2">
        {expenses.map((expense) => (
          <ExpenseCard key={expense._id} expense={expense} />
        ))}
      </div>
    </div>
  )
}

// Empty state — shown when no expenses match filter
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-4xl mb-3">🧾</p>
      <p className="text-sm font-medium text-zinc-400 mb-1">No expenses here</p>
      <p className="text-xs text-zinc-600">
        Try a different filter or add your first expense
      </p>
    </div>
  )
}

// ─── Main ExpenseList ─────────────────────────────────────────────────────────

export default function ExpenseList() {

  const {
    hasMore,
    loading,
    error,
    selectedMonth,
    selectedYear,
    fetchNextPage,
    fetchExpenses,
  } = useFetchExpense()

  
  const filteredExpenses = useFilteredExpenses();
  const sentinelRef      = useRef<HTMLDivElement>(null)
  const groups           = groupExpenses(filteredExpenses)

  // Fetch on mount
  useEffect(() => {
    fetchExpenses(1, selectedMonth, selectedYear)
  }, [])

  
  // Infinite scroll — watch sentinel div
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage()
      },
      { threshold: 0.1 }
    )
    if (sentinelRef.current) observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [hasMore, loading])

  return (


  <div className="overflow-hidden min-h-[250px]">
      {/* Scrollable list */}
      <section className="w-full flex justify-center mt-4">
      <div className="max-h-[520px] md:w-[90%] w-full m-2 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">

        {!(loading && filteredExpenses.length === 0) && <>
        <ExpenseGroupSection label="Today"              expenses={groups.Today}     />
        <ExpenseGroupSection label="Yesterday"          expenses={groups.Yesterday} />
        <ExpenseGroupSection label="Earlier this month" expenses={groups.Earlier}   />
        </> }

        {/* Empty state */}
        {filteredExpenses.length === 0 && !loading && <EmptyState />}

        {/* Sentinel — triggers next page on scroll */}
        {hasMore && <div ref={sentinelRef} className="h-4" />}

        {/* Loading spinner */}
        {loading && filteredExpenses.length ===0 &&(
          <div className="flex items-center justify-center gap-2 w-full overflow-hidden text-zinc-500">
            <Loader2 size={25} className="animate-spin" />
            <span className="text-lg">Loading...</span>
          </div>
        )}

        {/* All loaded message */}
        {!hasMore && filteredExpenses.length > 0 && (
          <p className="text-center text-xs text-zinc-600 py-4">
            ✓ All expenses loaded for {selectedMonth}
          </p>
        )}

        {/* Error + retry */}
        {error && (
          <p className="text-center text-xs text-red-400 py-4">
            {error} —{" "}
            <button
              onClick={() => fetchExpenses(1, selectedMonth, selectedYear)}
              className="underline"
            >
              retry
            </button>
          </p>
        )}

      </div>
       </section>
    </div>
  )
}