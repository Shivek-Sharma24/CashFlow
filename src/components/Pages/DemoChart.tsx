import React from 'react'
import Barchart from './Barchart'
import CategoryPieChart from './CategoryPieChart'

const DemoChart = () => {
  return (
    <div className='w-full flex justify-center'>
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:w-[90%] m-2">
    <Barchart/>
   <CategoryPieChart/>
</div>
    </div>
  )
}

export default React.memo(DemoChart)
