import React, { useCallback, useState, useEffect, useContext } from 'react'
import { MultiStepContext } from '../context/MultiStepContext'

type Props = {

}

type FormInputProps = {
    type: string,
    name: string,
    onChange: (str:React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (name: string) => void,
    onFocus?: (name: string) => void
    defaultValue?: string,
    error?: string,
    value: string

}


function FormInput ({
     type, 
     name, 
     defaultValue, 
     onChange,
     onBlur,
     onFocus,
     error,
     value
    } : FormInputProps) { 

    
    /*TO MAKE AN API CALL WE USE THE 
    fetch()     
    */

    return (
    <div className='flex flex-col gap-2'>
        <span className='capitalize'>{name}</span>
        <input 
        className='w-full px-2 py-1 border border-gray-300 rounded-lg'
        type={type} name={name}
        defaultValue={defaultValue}
        value={value} onChange={onChange} 
        onBlur={() => {
            if(onBlur){
                onBlur(name)
            }
        }}
        onFocus={() => {
            if(onFocus){
                onFocus(name)
            }
        }}
        />
        <div className='text-red-500'>{error}</div>
        
    </div>
    )
}



function ContactForm({}: Props) {


    const {setExternalError, error, addData, data} = useContext(MultiStepContext)


    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = e.target;


       

        //When we update it is not instant


        
        addData(name, value)

    },[])


    
    
    const handleInputBlur = useCallback((inputName:string) => {
        
        const validateEmail = ()=> {
            if(contactState.email === '') {

                setExternalError('email', 'This cannot be empty')

                
                return;
            }

            setExternalError('email', '')
        }
        const validateName = ()=> {
            if(contactState.name === '') {
                setFormErrors(prev => ({
                        ...prev,
                        nameError: 'This cannot be empty'
                }))
                return;
            }
            setFormErrors(prev => ({
                ...prev,
                nameError: ''
            }))
        }

        if(inputName === 'email'){
            validateEmail()

        }
        if(inputName === 'name'){
        validateName()
        }

    },[contactState])

    const handleInputFocus = useCallback((inputName:string) => {

        setFormErrors(prev => ({
            ...prev,
            [`${inputName}Error`]: ''
        }))
    },[formErrors])



    
    

  return (
    <div className='h-screen w-full bg-slate-50 flex items-center justify-center'>

        <form>
            <FormInput 
            type='email'
            name='email'
            onChange={handleInputChange}
            error={error.email}
            value={data.email}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            />
            <FormInput
            type='text'
            name='name'
            onChange={handleInputChange}
            error={formErrors.nameError}
            value={contactState.name}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            />
            <FormInput
            type='text'
            name='message'
            onChange={handleInputChange}
            error={formErrors.messageError}
            value={contactState.message}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            />

            <button className='bg-blue-500 px-2 py-1 rounded-lg w-full text-white'>
                Submit
            </button>
        </form> 
    </div>
  )
}

export default ContactForm