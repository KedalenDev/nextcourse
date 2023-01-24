import React, { useCallback, useState, useEffect } from 'react'

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
    value: string,
    checked?: boolean

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
    <div className='contactform flex flex-col gap-2'>
        <span className='uppercase font-bold'>{name}</span>
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


function RadioInput ({
    type, 
    name, 
    defaultValue, 
    onChange,
    onBlur,
    onFocus,
    error,
    value,
    checked
   } : FormInputProps) { 

   
   /*TO MAKE AN API CALL WE USE THE 
   fetch()
   */

   return (
   <div className='inputradio flex flex-col gap-2'>
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
        checked
       />
       <div className='text-red-500'>{error}</div>
       
   </div>
   )
}



function ContactForm({}: Props) {


    const [contactState, setContactState] = useState({
        email: '',
        name: '',
        surname1: '',
        surname2: '',
        birthdate: '',
        gender: '',
        mobile: '' 
    });


    const [formErrors, setFormErrors] = useState({
        emailError: '',
        nameError: '',
        surname1Error: '',
        surname2Error: '',
        birthError: '',
        genderError: '',
        mobileError: ''
    });

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = e.target;


       

        //When we update it is not instant


        
        setContactState((prev) => ({
            ...prev,
            [name]: value
        }))

    },[])


    
    
    const handleInputBlur = useCallback((inputName:string) => {
        
        const validateEmail = ()=> {
            if(contactState.email === '') {
                setFormErrors(prev => ({
                        ...prev,
                        emailError: 'Email is mandatory'
                }))
                return;
            }

            setFormErrors(prev => ({
                ...prev,
                emailError: ''
            }))
        }
        const validateName = ()=> {
            if(contactState.name === '') {
                setFormErrors(prev => ({
                        ...prev,
                        nameError: 'The name is mandatory'
                }))
                return;
            }
            setFormErrors(prev => ({
                ...prev,
                nameError: ''
            }))
        }
        const validateSurname = ()=> {
            if(contactState.surname1 === '') {
                setFormErrors(prev => ({
                        ...prev,
                        surname1Error: 'The surname 1 is mandatory'
                }))
                return;
            }
            setFormErrors(prev => ({
                ...prev,
                surname1Error: ''
            }))
        }
        const validateBirthDate = ()=> {
            if(contactState.birthdate === '') {
                setFormErrors(prev => ({
                        ...prev,
                        birthError: 'Date of birth is mandatory'
                }))
                return;
            }
            setFormErrors(prev => ({
                ...prev,
                birthError: ''
            }))
        }
        const validateGender = ()=> {
            if(contactState.gender === '') {
                setFormErrors(prev => ({
                        ...prev,
                        genderError: 'The gender is mandatory'
                }))
                return;
            }
            setFormErrors(prev => ({
                ...prev,
                genderError: ''
            }))
        }
        const validatePhone = ()=> {
            if(contactState.mobile === '') {
                setFormErrors(prev => ({
                        ...prev,
                        mobileError: 'Mobile phone is mandatory'
                }))
                return;
            }
            setFormErrors(prev => ({
                ...prev,
                mobileError: ''
            }))
        }                                

        if(inputName === 'email'){
            validateEmail()

        }
        if(inputName === 'name'){
            validateName()
        }
        if(inputName === 'surname1'){
            validateSurname()
        }
        if(inputName === 'birthdate'){
            validateBirthDate()
        }
        if(inputName === 'gender'){
            validateGender()
        }
        if(inputName === 'mobile'){
            validatePhone()
        }

    },[contactState])

    const handleInputFocus = useCallback((inputName:string) => {

        setFormErrors(prev => ({
            ...prev,
            [`${inputName}Error`]: ''
        }))
    },[formErrors]) 
    
    const getResponse = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const data = await response.json();
      console.log(data);
    };

    

  return (
    <div className='h-screen w-full bg-slate-50 flex items-center justify-center'>

        <form className='w-6/12' onSubmit={getResponse}>
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
            name='surname1'
            onChange={handleInputChange}
            error={formErrors.surname1Error}
            value={contactState.surname1}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            />
            <FormInput 
            type='text'
            name='surname2'
            onChange={handleInputChange}
            value={contactState.surname2}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            />
            <FormInput 
            type='date'
            name='birthdate'
            onChange={handleInputChange}
            error={formErrors.birthError}
            value={contactState.birthdate}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            />
            <FormInput 
            type='number'
            name='mobile'
            onChange={handleInputChange}
            error={formErrors.mobileError}
            value={contactState.mobile}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            />
            <FormInput 
            type='email'
            name='email'
            onChange={handleInputChange}
            error={formErrors.emailError}
            value={contactState.email}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            />  
            <span className='uppercase font-bold'>gender</span>    
            <RadioInput 
            type='radio'
            name='gender'
            onChange={handleInputChange}
            error={formErrors.genderError}
            value='M'
            checked
            /><span className='capitalize'>male</span> 
            <RadioInput 
            type='radio'
            name='gender'
            onChange={handleInputChange}
            error={formErrors.genderError}
            value='F'
            /><span className='capitalize'>female</span> 
            <RadioInput 
            type='radio'
            name='gender'
            onChange={handleInputChange}
            error={formErrors.genderError}
            value='N'
            /><span className='capitalize'>no binary</span>                  

            <button className='bg-blue-500 px-2 py-1 rounded-lg w-full text-white font-bold'>
                SUBMIT
            </button>    
        </form> 
    </div>
  )
}

export default ContactForm