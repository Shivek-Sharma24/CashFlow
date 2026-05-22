import { create } from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'
import { demoapi } from './useSignup'
import useMonthlyData from './useMonthlyData'
import useBarChart from './useGetBarChart'
import useGetPieChart from './useGetPieChart'
import { useFetchExpense } from './useFetchExpenses'
import { getCurrentMonth, getCurrentYear } from './useFetchExpenses'
// Types
type Category = 'Food' | 'Transport' | 'Shopping' | 'Entertainment' | 'Other' | ''

interface ExpenseForm {
    amount: string
    name: string
  category: Category
  date: string
  time: string
}

interface ExpenseStore {
  form: ExpenseForm
  errors: Partial<ExpenseForm>
  isLoading: boolean
  handleChange: (field: keyof ExpenseForm, value: string) => void
  validate: () => Partial<ExpenseForm>
  handleSubmit: (onSuccess?: () => void) => Promise<void>   //  onSuccess closes the dialog
  handleReset: () => void
}

// Default form values
const defaultForm: ExpenseForm = {
    amount: '',
    name: '',
  category: '',
  date: new Date().toISOString(),
  time: new Date().toTimeString().slice(0, 5),
}

const selectedMonth = getCurrentMonth();
const selectYear = getCurrentYear();

const useAddExpense = create<ExpenseStore>((set, get) => ({
  form: { ...defaultForm },
  errors: {},
  isLoading: false,

  // Update any field
  handleChange: (field, value) => {
    set((state) => ({
      form: { ...state.form, [field]: value },
      errors: { ...state.errors, [field]: '' },   // clear error on change
    }))
  },

  // Validate
  validate: () => {
    const { form } = get()
    const e: Partial<ExpenseForm> = {}
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) e.amount   = 'Enter a valid amount'
    if (!form.name.trim())                                          e.name     = 'Expense name is required'
    if (!form.category)                                             e.category = 'Select a category' as Category
    if (!form.date)                                                 e.date     = 'Select a date'
    return e
  },

  // Submit
  handleSubmit: async (onSuccess) => {
    const { form, validate } = get()

    // Validate
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      set({ errors: errs })
      return
    }

    const token = localStorage.getItem('token')
    set({ isLoading: true })
   
     try {
      await axios.post(
        `${demoapi}/add/expense`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
    
      toast.success('Expense added!')
      set({ form: { ...defaultForm }, errors: {} })
      onSuccess?.()       
      setTimeout(() => {
        useMonthlyData.getState().fetchMonthlyStats();
        useBarChart.getState().fetchWeeklyData();
        useGetPieChart.getState().fetchCategoryData();
        useFetchExpense.getState().fetchExpenses(1 , selectedMonth , selectYear);
      }, 700);                           //  closes the dialog from outside
    } catch (error) {
      toast.error('Failed to add expense, try again!')
      console.error('Error adding expense:', error)
    } finally {
      set({ isLoading: false })
    }
     
  },

  // Reset
  handleReset: () => {
    set({ form: { ...defaultForm }, errors: {} })
  },
}))

export default useAddExpense;