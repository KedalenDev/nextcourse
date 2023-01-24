
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ticketHandler } from '../utils/AxiosHandlers';
type Props = {}
export interface TicketsItem {
    id:          string;
    title:       string;
    description: string;
    price:       Price;
    mediaUrl:    string;
}

export interface Price {
    currency: string;
    price:    number;
    formated: string;
}

function Tickets({}: Props) {
    const [currency, setCurrency] = useState("EUR")
    const [tickets, setTickets] = useState<TicketsItem[]>([])
    const [selectedTicket, setSelectedTicker] = useState("")
    
    
    const handleCurrencyChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target;
        setCurrency(value)
    }, [currency])

    
    useEffect(() => {
        const getTickets = async () => {
            const URL = "https://courseapi.onrender.com/tickets"
            // const result = await fetch(URL, {
            //     method: "POST",
            //     body: JSON.stringify({
            //         currency: "LAR"
            //     })
            // })


            
            // if(result.status !== 200){
            //     throw new Error("AAA")
            // }
            // const data = await result.json();

            try {
            const result = await ticketHandler.post(URL, {
                currency
            })
            setTickets(result.data)
            } catch(err) {
                console.log(err)
                 
            }

        }

        getTickets();
    },[currency])

    useEffect(() => {
        const fetchSingleTicket = async () => {
            const URL = "https://courseapi.onrender.com/tickets"
            // const result = await fetch(URL, {
            //     method: "POST",
            //     body: JSON.stringify({
            //         currency: "LAR"
            //     })
            // })

            const config =  axios.create({
                baseURL: "https://courseapi.onrender.com/"
            })
            await config.post("/tickets")
            // if(result.status !== 200){
            //     throw new Error("AAA")
            // }
            // const data = await result.json();




            try {
            const result = await axios.post(URL, {
                currency
            })
            setTickets(result.data)
            } catch(err) {
                console.log(err)
                 
            }

        }
    },[selectedTicket])

  return (
    <div>
        {selectedTicket !== "" &&  <div className='absolute flex items-center justify-center w-screen h-screen bg-black bg-opacity-50'>
            <div className='w-[40%] h-[45%] bg-white rounded-md relative    '>
                <img src={tickets.find((ticket) => ticket.id === selectedTicket)?.mediaUrl} />  

                <button className='absolute top-5 right-5' onClick={() => setSelectedTicker("")}>X</button>
            </div>
        </div>}
        <select value={currency} onChange={handleCurrencyChange}>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
        </select>

        {tickets.map((ticket) => {
            return <div 
            onClick={() => setSelectedTicker(ticket.id)}
            key={ticket.id}> 
                {ticket.title}
                {ticket.price.formated}
            </div>
        })}

        
    </div>
  )
}

export default Tickets