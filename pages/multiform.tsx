import React, { useContext, useState } from 'react'
import MultiStepForm from '../components/MultiStepForm'
import { MultiStepContext, MultiStepContextProvider } from '../context/MultiStepContext'
import { FormStep } from '../context/MultiStepContext'
type Props = {}










const MultStepNumberOne = ()=> {

  const {addData,error, data} = useContext(MultiStepContext)


  return <div className='flex flex-col gap-4'>

      <input type={'text'} 
      
      onChange={e => addData('name', e.target.value)}

      value={data.name}
      placeholder={'Name'} className='w-full bg-gray-100 h-12 rounded-md p-3'/>
      <input type={'text'} 
      value={data.email}
      onChange={e => addData('email', e.target.value)}
      placeholder={'Email'} className='w-full bg-gray-100 h-12 rounded-md p-3'/>
      <input type={'text'} 
      value={data.username}
            onChange={e => addData('username', e.target.value)}

      placeholder={'UserName'} className='w-full bg-gray-100 h-12 rounded-md p-3'/>

  </div>
}

const ShowDataStep = () => {

  const {data} = useContext(MultiStepContext)

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}

const STEPS : FormStep[] = [
  {
    component: <MultStepNumberOne />,
   
  },
  {
    component: <ShowDataStep/>
  }
]

function Multiform({}: Props) {

  return (
    <div>
        <MultiStepContextProvider
        handleSubmit={(data) => {
          
          return ""
        }}
        totalSteps={STEPS}>
          <MultiStepForm />
        </MultiStepContextProvider>
    </div>
  )
}

export default Multiform