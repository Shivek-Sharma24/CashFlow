import { create } from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'
import { demoapi } from './useSignup'
interface MonthlyStats {
  _id: string
  totalAmount: number
  totalTransaction: number
  highestExpense: number
}

interface StatsStore {
  stats: MonthlyStats | null
  isLoading: boolean
  fetchMonthlyStats: () => Promise<void>
}

const useMonthlyData = create<StatsStore>((set) => ({
  stats: null,
  isLoading: false,

  fetchMonthlyStats: async () => {
    const token = localStorage.getItem('token')
    set({ isLoading: true })
    try {
      const res = await axios.get(`${demoapi}/expenses/monthly`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      set({ stats: res.data })
    } catch (error) {
      toast.error('Failed to fetch stats')
      console.error(error)
    } finally {
      set({ isLoading: false })
    }
  }
}))
export default useMonthlyData;

/*
const { stats, isLoading, fetchMonthlyStats } = useStatsStore()

useEffect(() => {
  fetchMonthlyStats()
}, [])

// Display
<p>Total Spent:        ₹{stats?.totalAmount}</p>
<p>Total Transactions: {stats?.totalTransaction}</p>
<p>Highest Expense:   ₹{stats?.highestExpense}</p>
*/