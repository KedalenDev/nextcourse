import React, { useContext } from "react";
import FirstStep from "./FirstStep";
import { MultiStepContext, MultiStepContextProvider } from '../context/MultiStepContext'


type Props = {}




function FirstStepNextButton({}: Props) {

    const {
        currentStep='STEP 1',
        next,
        back
    } = useContext(MultiStepContext)
    
    const FirstStepButton = () => {

        /* CODE TO MAKE FOR POSTING DATA */
    
      }

  return (
            <button onSubmit={FirstStepButton}>NEXT</button>
  )
}

export default FirstStepNextButton