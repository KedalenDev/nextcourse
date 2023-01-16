import React, { useState } from 'react'

type Props = {

}

type FormInputProps = {
    type: string,
    name: string,
    onChange: (str:string) => void,
    defaultValue?: string
}


function FormInput (
    {
     type, 
     name, 
     defaultValue, 
     onChange
    } : FormInputProps
) { 

    const [
        value,
        setValue
    ] = useState(defaultValue || '');


    const handleValueChange = (e:React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;
        if(value === 'test'){
            console.error('Invalid Input')
            return
        }
        setValue(e.target.value)
        onChange(e.target.value)
    }


    return (<input type={'email'} 
    className={'px-2 py-1 rounded-md w-full border-2'} 
    placeholder={'Your Email'} 
    name={name}
    value={value}
    onChange={handleValueChange}
    required
    
    />
    )
}

function ContactForm({}: Props) {


    
  return (
    <div className='h-screen w-full bg-slate-50 flex items-center justify-center'>

        <form>
         

            <FormInput 
            type='email'
            name='email'
            onChange={() => {

            }}
            />

            <button type='submit'>SEND</button>
        </form>
    </div>
  )
}

export default ContactForm