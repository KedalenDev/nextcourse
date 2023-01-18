import React from 'react'
import MultiStepForm from '../components/MultiStepForm'
import { MultiStepContext, MultiStepContextProvider } from '../context/MultiStepContext'

type Props = {}


const STEPS = [
  <div>STEP 1</div>, <div>STEP 2</div>, <div>STEP 3</div>,<div>STEP 4</div>
]

function Multiform({}: Props) {
  return (
    <div>
        <MultiStepContextProvider totalSteps={STEPS}>
          <MultiStepForm />
        </MultiStepContextProvider>
    </div>
  )
}

export default Multiform