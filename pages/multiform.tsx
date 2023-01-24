import React, { useContext } from 'react'
import FirstStep from '../components/FirstStep'
import MultiStepForm from '../components/MultiStepForm'
import { FormStep, MultiStepContext, MultiStepContextProvider } from '../context/MultiStepContext'
import * as zod from 'zod'
import { LanguageContext } from '../context/LangaugeContext'
type Props = {}





const FirstStepSchema = zod.object({
    name: zod.string({
      required_error: "Field Is Required",
      invalid_type_error: "ERROR_CODE_INVALID_TYPE"
    }).min(3).max(10),
    gender: zod.enum(["Male","Female","NonBinary"]).optional(),
    surname1: zod.string(),
    surname2: zod.string().min(3).optional(),
    birthdate: zod.string().refine((value) => {
      const brithAsDate = new Date(value)
      const today = new Date()

      const date = brithAsDate.getFullYear() <= today.getFullYear() - 18

      return date;
    }, {
      message: "You must be 18 years or older"
    }),
    mobile: zod.string().regex(new RegExp(/^\+?(6\d{2}|7[1-9]\d{1})\d{6}$/)),
    email: zod.string().email()
})


//We can extend from other zod objects to use them as base so we don't have to rerwrite everything
const SecondStepSchema = FirstStepSchema.extend({
  password: zod.string(),
  confirmPassword: zod.string(),
  address: zod.string(),
})






function Multiform({}: Props) {

  const {getString} = useContext(LanguageContext)
  
  const STEPS : FormStep[] = [
    {
      component: <div id='1'>
      STEP 1
      <FirstStep />
    </div>,
      handleSubmit: (data, setError) => {
  
        const validationResult = FirstStepSchema.safeParse(data)
  
        if(validationResult.success){
          
           const test =   {
                ...validationResult.data,
                surname2: validationResult.data.surname2 ?? ""
              }
  
              console.log("Body To Post ", test)  
  
          return ""
        }
        const issues = validationResult.error.issues;
        console.log(issues)
        issues.forEach((currentIssue) => {
          setError?.(currentIssue.path[0].toString(), getString(currentIssue.message) ?? currentIssue.message)
        })
  
        return "ERROR"
      }
    },
   {
      component:  <div id='2'>
      STEP 2
    </div>  
   }
  ]
  return (
    <div>
        <MultiStepContextProvider 
        handleSubmit={(data, setErrors) => {
         

          return ""
        }}
        totalSteps={STEPS}>
          <MultiStepForm />
        </MultiStepContextProvider>
    </div>
  )
}

export default Multiform