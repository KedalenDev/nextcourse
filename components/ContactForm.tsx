import React, { useCallback, useState, useEffect } from 'react'

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

    //Setvalue is not instant, it is async and will not update the value of the input until the next render
    const [
        value,
        setValue
    ] = useState(defaultValue || '');

    const [data, setData] = useState<any>(null)
    const [error, setError] = useState('');
    //You can use useEffect to subscribe to changes in the value state
    
   

    //If the useeffect ARRAY is empty it will only run once on the first render
    useEffect(() => {
        const apiCall = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
                
            })
            await new Promise((resolve) => setTimeout(resolve, 5000))
            const data = await response.json()
            setData(data)
        }
        apiCall()
    },[])

    useEffect(() => {
        if(value === 'test'){
            setError('Invalid Input')
            return
        } 
        if(value === 'test2'){
            setError('Invalid Input 2')
            return
        }


        setError('')

    }, [
        value
    ]);


    if(!data){
        return <div>Loading...</div>
    }

    

    const handleValueChange = (e:React.ChangeEvent<HTMLInputElement>) => {

        const newValue = e.target.value;
        
        console.log("Current Value: ",value)
        setValue(newValue)
        console.log("Current Value After Update: ", value)
        onChange(newValue)
    }



    return (
    <>
    {JSON.stringify(data)}
    </>
    )
}


//SERVICES
// -> AUTHENTICATION

function ContactForm({}: Props) {


    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);

    const handleSubmit = useCallback(() => {

        return num2 * num1;
    }, [num1, num2]);

    
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