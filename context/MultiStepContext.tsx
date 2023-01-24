import { type } from "os";
import React, { useState } from "react";

export type FormStep = {
  component: JSX.Element;
  handleSubmit?: (
    data: { [key: string]: string },
    setError?: (key: string, err: string) => void
  ) => string;
};

//TYPE FOR THE CONTEX LAYOUT
type MultiStepContextType = {
  currentStep: FormStep;
  currentStepNumber: number;
  totalSteps: FormStep[];
  next: () => void;
  back: () => void;
  handleSubmit: (
    data: { [key: string]: string },
    setError?: (key: string, err: string) => void
  ) => string;
  addData: (key: string, value: string) => void;
  data: { [key: string]: string };
  fieldErrors: { [key: string]: string };
  formError: string;
  setExternalError: (key: string, err: string) => void;
};

//ACTUAL CONTEXT OBJECT
export const MultiStepContext = React.createContext<MultiStepContextType>({
  currentStep: {
    component: <div>NO COMPONENT</div>,
    handleSubmit: () => "",
  },
  totalSteps: [] as FormStep[],
  currentStepNumber: 0,
  next: () => {},
  back: () => {},
  handleSubmit: () => "",
  addData: () => {},
  data: {},
  fieldErrors: {},
  formError: "",
  setExternalError: () => {},
});

type MultiStepContextProviderProps = {
  children: JSX.Element;
  totalSteps: FormStep[];
  handleSubmit: (
    data: { [key: string]: string },
    setError?: (key: string, errr: string) => void
  ) => string;
};

//CONTEXT PROVIDER

export const MultiStepContextProvider = ({
  children,
  totalSteps,
  handleSubmit,
}: MultiStepContextProviderProps) => {
  const [currentStep, setStep] = React.useState(0);

  const [fieldErrors, setFieldErrors] = useState({});
  const [data, setData] = React.useState({} as { [key: string]: string });
  const [formError, setFormError] = React.useState("");

  const setExternalError = (key: string, err: string) => {
    setFieldErrors((prev) => ({ ...prev, [key]: err }));
  };

  const handleFromSubmit = () => {
    const current = totalSteps[currentStep];

    // 1. create an error variable to store any errors
    let formError = "";
    let fieldError = "";
    // 2. check if the current form has a custom handleSubmit function
    if (current.handleSubmit) {
      // 3. if it does, run the custom handleSubmit function with the data and setExternalError
      formError = current.handleSubmit(data, (key: string, err: string) => {

        fieldError = err;
        setExternalError(key, err)
      });
    } else {
      // 4. if not, run the default handleSubmit function with the data and setExternalError
      formError = handleSubmit(data, (key: string, err: string) => {

        fieldError = err;
        setExternalError(key, err)
      });
    }

    return {
        formError,
        fieldError
    };
  };
  

  const next = () => {
    // 1. Validate form data
    const {
        formError,
        fieldError
    } = handleFromSubmit();

    if(formError !== "" || fieldError !== ""){
        return;
    }

    // 3. Update the step

    setStep((current) => {
      // Increment to the next step
      const next = current + 1;

      // If the next step is greater than the total number of steps, return the total number of steps
      if (next >= totalSteps.length - 1) {
        return totalSteps.length - 1;
      }

      // Return the incremented step
      return current + 1;
    });
  };

  const back = () => {
    setStep((current) => {
      const previousStep = current - 1;

      if (previousStep < 0) {
        return 0;
      }

      return current - 1;
    });
  };

  const addData = (key: string, value: string) => {
    // Set the data property to the previous state

    if(value === ""){
        
        setData((prev) => {
            const previousData = {...prev};

            delete previousData[key]

            return previousData;
        })

        return;
    }

    setData((prev) =>
      // Create a new object, based on the previous one
      ({
        ...prev,
        // Set the value of the key to the value passed in
        [key]: value,
      })
    );
  };

  return (
    <MultiStepContext.Provider
      value={{
        currentStep: totalSteps[currentStep],
        currentStepNumber: currentStep,
        totalSteps,
        next,
        back,
        addData,
        data,
        handleSubmit,
        formError,
        fieldErrors,
        setExternalError,
      }}
    >
      {children}
    </MultiStepContext.Provider>
  );
};
