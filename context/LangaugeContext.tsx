import React, { useState } from "react";
import { Convert, LanguageRequest } from "../utils/LanaguageConverter";

type LanguageContextType = {
    changeLanguage: (langCode:string) => void,
    getString: (tag: string) => string | null
}



export const LanguageContext = React.createContext<LanguageContextType>({
    changeLanguage: () => {},
    getString: () => null
} as LanguageContextType)



const FETCH_URL = "https://courseapi.onrender.com/lang/"



export const LanguageContextProver = ({children}: {children: JSX.Element}) => {



    // This is a React hook that is used to store the current language code
    const [currentLanguageCode, setCurrentLanguageCode] = useState("ENG");

    // This is a React hook that is used to store the current language
    const [currentLanguage, setCurrentLanguage] = useState([] as LanguageRequest["MESSAGE_LIST"]);



    const getLanguage = async (code:string) => {

        // Here we are making a request to our server to get the language data
const response = await fetch(FETCH_URL + code);
        const text = await response.text()
        // We convert the response into a LanguageRequest object
        const lang = Convert.toLanguageRequest(text)        
        if(lang.MESSAGE_CODE !== "")
        {
            return;
        }
        // We set the current language to the one we just got from our server
        setCurrentLanguage(lang.MESSAGE_LIST)
        // We save the language to local storage so we don't have to make the request again
        localStorage.setItem("lang", JSON.stringify(lang.MESSAGE_LIST))
    }

    React.useEffect(() => {

        // get the stored language from the localStorage
        const storedLang = localStorage.getItem('lang')
        const storedLangCode = localStorage.getItem('lang_code')

        // if the language is empty or the language code is empty
        if(!storedLang || !storedLangCode){
            // set the current language to Catalan or the Default you choose
            setCurrentLanguageCode("CAT")
            // get the language from the API
            getLanguage("CAT")
            // store the language code
            localStorage.setItem("lang_code", "CAT")
            return;
        }


        if(storedLang && storedLangCode){
                // get the language from the API
                getLanguage(storedLangCode);
                // set the current language code
                setCurrentLanguageCode(storedLangCode)
        }

        
       

    },[])

    

    

    const changeLanguage = (code: string) => {
       // 1. Get the stored language code from localStorage
const storedLangCode = localStorage.getItem('lang_code')

// 2. If the stored language code is different from the current language code, get a new language
if(storedLangCode && (code !== storedLangCode)){
    getLanguage(code)
}

// 3. Set the current language code to the code passed in as an argument
setCurrentLanguageCode(code)

// 4. Store the current language code in localStorage
localStorage.setItem('lang_code', code)
    }

    const getString = (tag:string) => {
        // Find the current language from the array of languages
        const str = currentLanguage.find(item => item.TAG === tag)
        // Return the message if it exists, otherwise return null
        return str?.MESSAGE ?? null
    }

    return <LanguageContext.Provider value={{
        changeLanguage,
        getString
    }}>
        {children}
    </LanguageContext.Provider>
}


