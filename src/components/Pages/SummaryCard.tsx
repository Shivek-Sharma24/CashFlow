import React, { useEffect } from 'react'
import { Card, CardContent } from '../ui/card';
import {Wallet , Receipt, TrendingUp} from "lucide-react"
import useMonthlyData from '@/Zustand/useMonthlyData';

const SummaryCard = () => {
  const {stats ,  fetchMonthlyStats} = useMonthlyData();
  useEffect(()=>{
    fetchMonthlyStats();
  },[])
  return (
    <div className='grid sm:grid-cols-3 gap-5 mt-4 p-2 md:w-[90%] mx-auto'>
       <Card className="border-l-4 border-l-emerald-500 rounded-l-none bg-[#2D2D2D]">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-2 font-medium">
            <Wallet size={14} color='gray'/>
            This month
          </div>
          <div className="text-2xl font-medium text-gray-200">
             <span className="text-sm font-medium text-emerald-400 bg-emerald-900/40 px-3 py-2 rounded-full">
          ₹{stats?.totalAmount ?? 0} spent
        </span>
            {/* ₹{stats?.totalAmount ?? 0} */}
            </div>
         
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-emerald-500 rounded-l-none bg-[#2D2D2D]">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-2 font-medium">
            <Receipt size={14} />
            Expenses
          </div>
          <div className="text-2xl font-medium text-gray-200">{stats?.totalTransaction ?? 0}</div>
          <div className="text-xs text-gray-400  mt-1">transactions</div>
        </CardContent>
      </Card>

 <Card className="border-l-4 border-l-emerald-500 rounded-l-none bg-[#2D2D2D]">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-gray-400 font-medium text-xs mb-2">
            <TrendingUp size={14} />
            Highest
          </div>
          <div className="text-2xl font-medium text-gray-200">₹{stats?.highestExpense ?? 0}</div>
          <div className="text-xs text-gray-400 mt-1">Rent · May 1</div>
        </CardContent>
      </Card>
    </div>
  )
}

export default React.memo(SummaryCard);
