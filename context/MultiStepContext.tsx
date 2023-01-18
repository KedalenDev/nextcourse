import React from "react";




/*
  

*/

//TYPE FOR THE CONTEX LAYOUT
type MultiStepContextType =  {
    currentStep: JSX.Element,
    totalSteps: JSX.Element[],
    next: () => void,
    back: () => void,
}


//ACTUAL CONTEXT OBJECT
export const MultiStepContext = React.createContext<MultiStepContextType>({
    currentStep: <></>,
    totalSteps: [],
    next: () => {},
    back: () => {}
})


//CONTEXT PROVIDER

export const MultiStepContextProvider = ({children, totalSteps}:{children: JSX.Element | JSX.Element[], totalSteps: JSX.Element[]})=> {

    const [currentStep, setStep] = React.useState(0);
 
    const next = () => {
        setStep((current) => {

            const next = current + 1;

            if(next >= (totalSteps.length - 1)) {
                return (totalSteps.length - 1);
            }

            return (current + 1)
        })
    }

    const back = () => {
        setStep((current) => {

            const previousStep = current - 1;

            if(previousStep < 0) {
                return 0;
            }

            return (current - 1)
        })
    }




    return (
        <MultiStepContext.Provider value={{
            currentStep: totalSteps[currentStep],
            totalSteps,
            next, 
            back
        }}>
            {children}
        </MultiStepContext.Provider>
    )

}





