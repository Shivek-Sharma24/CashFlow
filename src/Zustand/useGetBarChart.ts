import { create } from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'
import { demoapi } from './useSignup'
interface WeeklyData {
  day: string
  amount: number
}

interface ChartStore {
  chartData: WeeklyData[]
  isLoading: boolean
  fetchWeeklyData: () => Promise<void>
}

const useBarChart = create<ChartStore>((set) => ({
  chartData: [],
  isLoading: false,

  fetchWeeklyData: async () => {
    const token = localStorage.getItem('token')
    set({ isLoading: true })
    try {
      const res = await axios.get(`${demoapi}/expenses/weekly`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      set({ chartData: res.data })
    } catch (error) {
      toast.error('Failed to fetch chart data')
      console.error(error)
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default useBarChart;