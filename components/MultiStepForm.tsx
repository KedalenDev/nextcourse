


import React, { useContext } from 'react'
import { MultiStepContext, MultiStepContextProvider } from '../context/MultiStepContext'

type Props = {}






function MultiStepForm({}: Props) {

    const {
        totalSteps,
        currentStep,
        next,
        back
    } = useContext(MultiStepContext)

    

  return (
    <form 
    onSubmit={e => e.preventDefault()}
    className='max-w-6xl mx-auto bg-gray-200 p-8 rounded-md shadow-lg mt-12 flex flex-col gap-8'>
        {currentStep}
        <div className='w-full flex flex-row gap-3'>
            <button onClick={back}>BACK</button>
            <button onClick={next}>NEXT</button>
        </div>
    </form>
  )
}

export default MultiStepForm