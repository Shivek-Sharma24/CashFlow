import {create} from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'
import { demoapi } from './useSignup'

interface CategoryData {
  category: string
  value: number
  color: string
}

interface CategoryStore {
  categoryData: CategoryData[]
  isLoading: boolean
  fetchCategoryData: () => Promise<void>
}

const useGetPieChart = create<CategoryStore>((set) => ({
  categoryData: [],
  isLoading: false,

  fetchCategoryData: async () => {
    const token = localStorage.getItem('token')
    set({ isLoading: true })
    try {
      const res = await axios.get(`${demoapi}/expenses/category`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      set({ categoryData: res.data })
    } catch (error) {
      toast.error('Failed to fetch category data')
      console.error(error)
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default useGetPieChart;