import { create } from "zustand";
import { demoapi } from "./useSignup";
import { useShallow } from "zustand/react/shallow";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Expense {
  _id: string;
  name: string;
  amount: number;
  category:
    | "Food"
    | "Entertainment"
    | "Travel"
    | "Shopping"
    | "Health"
    | "Other";
  date: string;
  time?: string;
}

type Category = "All" | Expense["category"];

interface ExpenseState {
  // ── Data ──────────────────────────────────────────────────────────────────
  allExpenses: Expense[]; // all fetched expenses for current month (raw)
  totalCount: number; // total expenses in current month on backend

  // ── Filters ───────────────────────────────────────────────────────────────
  selectedMonth: string; // e.g. "may"
  selectedYear: number; // e.g. 2026
  selectedCategory: Category; // local filter only, no API call
  currentPage: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;

  // Actions
  fetchExpenses: (page: number, month: string, year: number) => Promise<void>;
  fetchNextPage: () => void;
  setMonth: (month: string, year?: number) => void;
  setCategory: (category: Category) => void;
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  reset: () => void;
}

const BATCH_SIZE = 5;

export const getCurrentMonth = () =>
  new Date().toLocaleString("default", { month: "long" }).toLowerCase();

export const getCurrentYear = () => new Date().getFullYear();

// ─── Store ────────────────────────────────────────────────────────────────────

export const useFetchExpense = create<ExpenseState>((set, get) => ({
  // ── Initial state ─────────────────────────────────────────────────────────
  allExpenses: [],
  totalCount: 0,
  selectedMonth: getCurrentMonth(),
  selectedYear: getCurrentYear(),
  selectedCategory: "All",
  currentPage: 1,
  hasMore: true,
  loading: false,
  error: null,

  // ── Fetch a batch of expenses from backend ────────────────────────────────
  fetchExpenses: async (page, month, year) => {
  
    set({ loading: true, error: null });

    try {
      const res = await fetch(
        `${demoapi}/expenses?month=${month}&year=${year}&page=${page}&limit=${BATCH_SIZE}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!res.ok) throw new Error("Failed to fetch expenses");

      const data = await res.json();
    
      // setTimeout(() => {
      set((state) => ({
        // page 1 means fresh load → replace. page > 1 means scroll → append
        allExpenses:
          page === 1 ? data.expenses : [...state.allExpenses, ...data.expenses],
        totalCount: data.totalCount,
        currentPage: data.currentPage,
        hasMore: data.hasMore,
        loading: false,
      }));
      // }, 500);
    } catch (err: string | unknown) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  },

  // ── Triggered by IntersectionObserver on scroll ───────────────────────────
  fetchNextPage: () => {
    const { hasMore, loading, currentPage, selectedMonth, selectedYear } =
      get();
    if (!hasMore || loading) return;
    get().fetchExpenses(currentPage + 1, selectedMonth, selectedYear);
  },

  // ── Month chip clicked → reset everything and fetch fresh ─────────────────
  setMonth: (month, year) => {
    const newYear = year ?? getCurrentYear();
    console.log("setMonth called", month, newYear);
    set({
      selectedMonth: month,
      selectedYear: newYear,
      selectedCategory: "All", // reset category when month changes
      allExpenses: [],
      currentPage: 1,
      hasMore: true,
      error: null,
      loading: true,
    });
    get().fetchExpenses(1, month, newYear);
  },

  // ── Category chip clicked → local filter only, NO API call ────────────────
  setCategory: (category) => {
    set({ selectedCategory: category });
  },

  // ── Add a new expense (after successful API call) ─────────────────────────
  addExpense: (expense) => {
    set((state) => ({
      allExpenses: [expense, ...state.allExpenses], // prepend so it shows on top
      totalCount: state.totalCount + 1,
    }));
  },

  // ── Delete an expense (after successful API call) ─────────────────────────
  deleteExpense: (id) => {
    set((state) => ({
      allExpenses: state.allExpenses.filter((e) => e._id !== id),
      totalCount: state.totalCount - 1,
    }));
  },

  // ── Full reset ────────────────────────────────────────────────────────────
  reset: () => {
    set({
      allExpenses: [],
      totalCount: 0,
      selectedMonth: getCurrentMonth(),
      selectedYear: getCurrentYear(),
      selectedCategory: "All",
      currentPage: 1,
      hasMore: true,
      loading: false,
      error: null,
    });
  },
}));

// ─── Derived selector (use this in components) ────────────────────────────────
// Filters allExpenses locally by category — no API call
export const useFilteredExpenses = () =>
  useFetchExpense(
    useShallow((state) =>
      state.selectedCategory === "All"
        ? state.allExpenses
        : state.allExpenses.filter(
            (e) => e.category === state.selectedCategory,
          ),
    ),
  );
