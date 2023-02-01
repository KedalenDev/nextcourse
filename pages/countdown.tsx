import React, { useState } from 'react'
import moment from 'moment'
import {useCountDown, useCountDownProps} from '../hooks/useCountDown'
import {useRouter} from 'next/router'

function Countdown(props: useCountDownProps) {
 
  const {formattedDiff, target, now, isInThePast} = useCountDown(props)
  const router = useRouter()

  return (
    <div className='flex h-screen overflow-hidden items-center justify-center bg-gray-300 font-black text-4xl flex-col gap-3 '>
       <span className='font-light'>
        {isInThePast ? 'Event happened at: ': 'Event starts in:'}
       </span>
        <span className='text-sm text-gray-500 font-light'>Now: {now}</span>
        {formattedDiff}
        <span className='text-sm text-gray-500 font-light'>Event TimeStamp: {target}</span>
       <button 
       onClick={router.reload}
       className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Refetch
        </button>
    </div>
  )
}

//getServerSideProps


// export async function getServerSideProps(ctx:any) {

//     //populated from the url query params so ?future=false will result in query.future = false
//     const query = ctx.query;
//     const data =  await fetch(`https://courseapi.onrender.com/time/${query.future ?? "true"}`)
//     const json = await data.json();
    
//     const now = moment();
//     const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";
//     const targetTime = moment(json.time, DATE_FORMAT);  

//     const diff = targetTime.diff(now, 'seconds')

//     const isInThePast = diff < 0;
    
//     //TARGET TIME = json
//     //DIFF NOW AND TARGET


//     return {
//         props: {
//             targetTime: targetTime.format(DATE_FORMAT),
//             isPastDate: isInThePast
//         }
//     }
// }



export default Countdown