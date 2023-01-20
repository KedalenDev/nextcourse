import React, { useState } from "react";




/*
  

*/





//TYPE FOR THE CONTEX LAYOUT
//For more fine grained control over the steps submit, we can specify a handleSubmit function for each step



export type FormStep = {
    component: JSX.Element,
    handleSubmit?: (data:{[key:string]: string}, setError?: (key:string, err: string) => void) => string
}



type MultiStepContextType =  {
    currentStep: FormStep,
    currentStepNumber: number,
    totalSteps: FormStep[],
    next: () => void,
    back: () => void,
    handleSubmit: (data:{[key:string]: string}, setError?: (key:string, err: string) => void) => string,
    addData: (key:string, value: string) => void,
    data: {[key:string]: string},
    error: {[key:string]: string},
    setExternalError: (key:string, err:string) => void
}


//ACTUAL CONTEXT OBJECT



export const MultiStepContext = React.createContext<MultiStepContextType>({
    currentStep: {
        component: <div>NO COMPONENT</div>,
        handleSubmit: () => ''
    },
    totalSteps: [] as FormStep[],
    currentStepNumber: 0,
    next: () => {},
    back: () => {},
    handleSubmit: () => '',
    addData: () => {},
    data: {},
    error: {},
    setExternalError: () => {}
})


type MultiStepContextProviderProps = { 
    children: JSX.Element,
    totalSteps: FormStep[],
    handleSubmit: (data:{[key:string]: string}, setError?: (key:string, errr: string) => void) => string
}
//CONTEXT PROVIDER

export const MultiStepContextProvider = ({children, totalSteps, handleSubmit}: MultiStepContextProviderProps)=> {

    const [currentStep, setStep] = React.useState(0);
 
    const [error, setError] = useState({});
    const [data, setData] = React.useState({} as {[key:string]: string});


    const setExternalError = (key: string, err: string) => {

        setError((prev) => ({...prev, [key]: err}))
    }

    
    const handleFromSubmit = () => {
        const current = totalSteps[currentStep];


        
 
    // 1. create an error variable to store any errors
    let error = "";
    // 2. check if the current form has a custom handleSubmit function
    if (current.handleSubmit) {
        // 3. if it does, run the custom handleSubmit function with the data and setExternalError
        error = current.handleSubmit(data, setExternalError);
    } else {
        // 4. if not, run the default handleSubmit function with the data and setExternalError
        error = handleSubmit(data, setExternalError);
    }

        return error;
    }


    
    const next = () => {


       // 1. Validate form data
    const err =  handleFromSubmit();

    // 2. If there are errors, return early
       if(err !== "") {
            return;
       }

    // 3. Update the step
        setStep((current) => {

            // Get the current step

            // Increment to the next step
            const next = current + 1;

            // If the next step is greater than the total number of steps, return the total number of steps
            if(next >= (totalSteps.length - 1)) {
                return (totalSteps.length - 1);
            }

            // Return the incremented step
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

    const addData = (key:string, value: string) => {
        // Set the data property to the previous state
setData(prev => (
    // Create a new object, based on the previous one
    {...prev, 
        // Set the value of the key to the value passed in
        [key] : value
    }
))
    }

  


    return (
        <MultiStepContext.Provider value={{
            currentStep: totalSteps[currentStep],
            currentStepNumber: currentStep,
            totalSteps,
            next, 
            back,
            addData,
            data,
            handleSubmit,
            error,
            setExternalError
        }}>
            {children}
        </MultiStepContext.Provider>
    )

}





