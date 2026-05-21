import React from 'react'
import AddExpenseDialog from './Form'
import { useFetchExpense } from '@/Zustand/useFetchExpenses'


const AddExpense = () => {
  const {totalCount} = useFetchExpense()
  return (
    <div className='md:w-[90%] mx-auto flex justify-between p-2 m-2 mt-4'>
      <div>
        <p className='text-gray-200 font-semibold sm:text-lg'>{totalCount} Expenses in May</p>
      </div>
      <div>
        <AddExpenseDialog/>
      </div>
    </div>
  )
}

export default React.memo(AddExpense)
