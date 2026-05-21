import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useFetchExpense } from "@/Zustand/useFetchExpenses";

// ─── Types 

type Category = "All" | "Food" | "Entertainment" | "Travel" | "Shopping";
type Month =  "May" | "Apr" | "Mar";
// ─── Category config 

const categoryConfig: Record<
  Exclude<Category, "All">,
  {
    border: string;
    iconBg: string;
    iconColor: string;
    badgeBg: string;
    badgeColor: string;
    icon: string;
  }
> = {
  Food: {
    border: "#1D9E75",
    iconBg: "#E1F5EE",
    iconColor: "#0F6E56",
    badgeBg: "#E1F5EE",
    badgeColor: "#0F6E56",
    icon: "🍴",
  },
  Entertainment: {
    border: "#AFA9EC",
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
    badgeBg: "#EEEDFE",
    badgeColor: "#534AB7",
    icon: "🎮",
  },
  Travel: {
    border: "#EF9F27",
    iconBg: "#FAEEDA",
    iconColor: "#854F0B",
    badgeBg: "#FAEEDA",
    badgeColor: "#854F0B",
    icon: "✈️",
  },
  Shopping: {
    border: "#F0997B",
    iconBg: "#FAECE7",
    iconColor: "#993C1D",
    badgeBg: "#FAECE7",
    badgeColor: "#993C1D",
    icon: "🛍️",
  },
};

// ─── Mock data ────────────────────────────────────────────────────────────────

// const EXPENSES: Expense[] = [
//   {
//     id: "1",
//     name: "Lunch at Taj Hotel",
//     amount: 850,
//     category: "Food",
//     date: "May 16",
//     time: "1:30 PM",
//     group: "Today",
//   },
//   {
//     id: "2",
//     name: "Netflix subscription",
//     amount: 649,
//     category: "Entertainment",
//     date: "May 16",
//     time: "10:00 AM",
//     group: "Today",
//   },
//   {
//     id: "3",
//     name: "Cab to airport",
//     amount: 420,
//     category: "Travel",
//     date: "May 15",
//     time: "6:45 AM",
//     group: "Yesterday",
//   },
//   {
//     id: "4",
//     name: "Amazon order",
//     amount: 1299,
//     category: "Shopping",
//     date: "May 15",
//     time: "2:15 PM",
//     group: "Yesterday",
//   },
//   {
//     id: "5",
//     name: "Dinner — Dominos",
//     amount: 599,
//     category: "Food",
//     date: "May 15",
//     time: "8:40 PM",
//     group: "Yesterday",
//   },
//   {
//     id: "6",
//     name: "Spotify premium",
//     amount: 119,
//     category: "Entertainment",
//     date: "May 8",
//     time: "10:00 AM",
//     group: "Earlier",
//   },
//   {
//     id: "7",
//     name: "Flight to Mumbai",
//     amount: 4200,
//     category: "Travel",
//     date: "May 6",
//     time: "9:00 AM",
//     group: "Earlier",
//   },
//   {
//     id: "8",
//     name: "Weekly groceries",
//     amount: 1840,
//     category: "Food",
//     date: "May 4",
//     time: "11:30 AM",
//     group: "Earlier",
//   },
//   {
//     id: "9",
//     name: "Zomato order",
//     amount: 320,
//     category: "Food",
//     date: "May 3",
//     time: "7:00 PM",
//     group: "Earlier",
//   },
//   {
//     id: "10",
//     name: "Movie tickets",
//     amount: 480,
//     category: "Entertainment",
//     date: "May 2",
//     time: "5:30 PM",
//     group: "Earlier",
//   },
// ];

// ─── Filter Bar ───────────────────────────────────────────────────────────────


const MONTHS: Month[] = [ "May", "Apr", "Mar"];
const CATEGORIES: Category[] = [
  "All",
  "Food",
  "Entertainment",
  "Travel",
  "Shopping",
];

export function FilterBar(){

  // const { selectedMonth, selectedCategory, onMonthChange, onCategoryChange } = useFilterStore()
  const {selectedMonth , selectedCategory , setMonth , setCategory} = useFetchExpense();

  return (
    <div className="w-full flex justify-center">
    <Card className="mb-4 border border-zinc-800 bg-zinc-900 md:w-[90%] md:mx-auto m-[10px] md:m-0">
      <CardContent className="p-3">
        <div className="flex flex-wrap items-center gap-2 justify-center">
          {/* Month chips */}
          <span className="text-xs text-zinc-500 mr-1 shrink-0">Month</span>
          {MONTHS.map((m: Month) => (
            <button
              key={m}
              onClick={() => setMonth(m)}
              className={cn(
                "px-3 py-1 rounded-full text-xs border transition-all duration-150 shrink-0 cursor-pointer",
                selectedMonth === m
                ? "bg-emerald-900/60 border-emerald-600 text-emerald-400 font-medium"
                  : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500",
              )}
            >
              {m}
            </button>
          ))}

          {/* Divider */}
          <div className="w-px h-4 bg-zinc-700 mx-1 shrink-0 hidden sm:block" />

          {/* Category chips */}
          <span className="text-xs text-zinc-500 mr-1 shrink-0">Category</span>
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((c: Category) => (
              <button
              key={c}
              onClick={() =>setCategory(c)}
                className={cn(
                    "px-3 py-1 rounded-full text-xs border transition-all duration-150 shrink-0 cursor-pointer",
                    selectedCategory === c
                    ? "bg-emerald-900/60 border-emerald-600 text-emerald-400 font-medium"
                    : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500",
                )}
              >
                {c === "All"
                  ? "All"
                  : `${categoryConfig[c as Exclude<Category, "All">].icon} ${c}`}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
</div>
  );
}






