import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
  DialogFooter,

} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import useAddExpense from "@/Zustand/useAddExpense";
import { Spinner } from "../ui/spinner";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category =
  | "Food"
  | "Entertainment"
  | "Travel"
  | "Shopping"
  | "Health"
  | "Other";

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
  const {handleReset , handleChange , handleSubmit,form, errors, isLoading} = useAddExpense();
    const [open, setOpen] = useState(false);

  return (

     <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer">
            <Plus size={14} />
            Add Expense</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm bg-zinc-900 text-gray-200">
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
            <DialogDescription>
             Fill in the details below to log a new expense
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Amount</Label>
              <Input id="name-1" name="name" 
              placeholder="$" 
              className="outline-none"
              value={form.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              />
              {errors.amount && (
              <p className="text-xs text-red-400">{errors.amount}</p>
            )}
            </Field>
            <Field>
              <Label htmlFor="username-1">Expense Name</Label>
              <Input id="username-1" 
              name="username" 
              placeholder="e.g. Lunch , Netflix"
              value={form.name}
              onChange={(e) => {
                handleChange('name', e.target.value);
              }}
              />
              {errors.name && (
              <p className="text-xs text-red-400">{errors.name}</p>
            )}
            </Field>
          </FieldGroup>
         <div className="flex flex-col gap-2">
                     <Label className="text-xs font-medium text-zinc-400">
                       Category
                     </Label>
                     <div
                      className="grid grid-cols-3 gap-2"
                              
                      >
                       {CATEGORIES.map((cat) => {
                         const isActive = form.category === cat.value;
                         return (
                           <button
                             key={cat.value}
                             onClick={() => {
                               handleChange('category', cat.value);
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
           <div 
          className="grid grid-cols-2 gap-3"
                  >
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-zinc-400">Date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) =>
                  handleChange('date', e.target.value)
                }
                className="bg-zinc-800 border-zinc-700 text-zinc-100 rounded-xl h-10 focus-visible:ring-0 focus-visible:border-emerald-600 transition-colors [color-scheme:dark]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-zinc-400">Time</Label>
              <Input
                type="time"
                value={form.time}
                onChange={(e) =>
                  handleChange('time', e.target.value)
                }
                className="bg-zinc-800 border-zinc-700 text-zinc-100 rounded-xl h-10 focus-visible:ring-0 focus-visible:border-emerald-600 transition-colors [color-scheme:dark]"
              />
            </div>
          </div>
          <DialogFooter className="bg-zinc-800">
            <div className="flex justify-between w-full">
            <Button type="submit" className="cursor-pointer" onClick={handleReset}>
               <Trash2 size={13} />
            </Button>
            <div>
               <DialogClose asChild className="mr-2">
              <Button variant="outline" className="bg-red-400 text-gray-300 cursor-pointer">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer" disabled={isLoading} onClick={() => handleSubmit(() => setOpen(false))}>
              {
                isLoading ? <Spinner className="size-4"/> : 'Add Expense'
              }
            </Button>
            </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
