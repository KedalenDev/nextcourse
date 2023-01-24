


import { type } from 'os';
import React, { useContext } from 'react'
import { MultiStepContext, MultiStepContextProvider } from '../context/MultiStepContext'

type Props = {}


function MultiStepForm({}: Props) {

  const {
    totalSteps,
    currentStep,
    next,
    back,
    fieldErrors,
    formError,
    currentStepNumber
  } = useContext(MultiStepContext)
    

  return (
    <form onSubmit={e => {e.preventDefault();}}
    className='w-full p-5'>
        <span>Current Step: {currentStepNumber + 1} / {totalSteps.length}</span>
        <span className='text-red-500 text-lg'>{formError}</span>
        {currentStep.component}
        <div className='w-full flex flex-row gap-3'>
        <button 
            className='bg-gray-800 font-black text-white px-3 py-2 disabled:bg-black disabled:text-black'
            disabled={currentStepNumber === 0}
            onClick={back}>BACK</button>

            <button 
            onClick={next}
            className='bg-gray-800 font-black text-white px-3 py-2 disabled:bg-black disabled:text-black'>
              {(totalSteps.length === currentStepNumber + 1) ? 'FINISH' : 'NEXT'}
            </button>
        </div>
    </form>
  )
}

export default MultiStepForm