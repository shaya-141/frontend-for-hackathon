import React from 'react'
import VisitorCard from './VisitorsCard'

function Visitors({visitor}) {
  console.log("visitor in visiot",visitor);
  

  return (
    <div className='w-full h-[300px] flex items-center justify-evenly rounded bg-gray-50 mt-3'>
            <VisitorCard numbers={visitor?.data?.todayVisitors?.length} name={'daily visitors'}></VisitorCard>
            <VisitorCard numbers={visitor?.data?.newVisitors?.length} name={'new visitors'}></VisitorCard>
            <VisitorCard numbers={visitor?.data?.oldVisitors?.length} name={'old visitors'}></VisitorCard>
    </div>
  )
}

export default Visitors