import React, { useState } from "react";
import { Convert, LanguageRequest } from "../utils/LanaguageConverter";


export type LANG_CODES = "CAT" | "ESP" | "ENG" | "FRA";

type LanguageContextType = {
  changeLanguage: (langCode: LANG_CODES) => void;
  getString: (tag: string, defaultValue?:string) => string | null;
  currentLanguageCode: LANG_CODES
};

export const LanguageContext = React.createContext<LanguageContextType>({
  changeLanguage: () => {},
  getString: () => null,
  currentLanguageCode: "ESP"
} as LanguageContextType);

const FETCH_URL = "https://courseapi.onrender.com/lang/";
const DEFAULT_LANGUAGE = [{"MESSAGE":"FROM ERROR LANGUAGE","TAG":"name"},{"MESSAGE":"Nom 1","TAG":"surname1"},{"MESSAGE":"Nom 2","TAG":"surname2"},{"MESSAGE":"Téléphone portable","TAG":"mobile_phone"}]

export const LanguageContextProvider = ({
  children,
  defaultLanguage
}: {
  children: JSX.Element;
  defaultLanguage: LANG_CODES
}) => {
  // This is a React hook that is used to store the current language code
  const [currentLanguageCode, setCurrentLanguageCode] = useState<LANG_CODES>(defaultLanguage);
  const [fetchingLanguage, setFetchingLanguage] = useState(false)
  // This is a React hook that is used to store the current language
  const [currentLanguage, setCurrentLanguage] = useState(
    [] as LanguageRequest["MESSAGE_LIST"]
  );

  const getLanguage = async (code: LANG_CODES) => {
    // Here we are making a request to our server to get the language data
    setFetchingLanguage(true)
    let language = currentLanguage;
    try {
        const response = await fetch(FETCH_URL + code);
        const text = await response.text();
        // We convert the response into a LanguageRequest object
    
        await new Promise((res) => {
            setTimeout(res, 1000)
        })
        const lang = Convert.toLanguageRequest(text);
        if (lang.MESSAGE_CODE !== "") {
          return;
        }

        language = lang.MESSAGE_LIST;
        setCurrentLanguage(language);
        // We save the language to local storage so we don't have to make the request again
        localStorage.setItem("lang", JSON.stringify(language));
    
    } catch(err){
        alert(`Something went wrong while fetching ${code}`)
        setCurrentLanguage(DEFAULT_LANGUAGE)
        localStorage.setItem("lang", JSON.stringify(DEFAULT_LANGUAGE));    
    }

    setFetchingLanguage(false)

    
    // We set the current language to the one we just got from our server
    
  };

  React.useEffect(() => {
    // get the stored language from the localStorage
    const storedLang = localStorage.getItem("lang");
    const storedLangCode = localStorage.getItem("lang_code");

    // if the language is empty or the language code is empty
    if (!storedLang || !storedLangCode) {
      // set the current language to Catalan or the Default you choose
      setCurrentLanguageCode(defaultLanguage);
      // get the language from the API

      getLanguage(defaultLanguage);
      // store the language code
      localStorage.setItem("lang_code", defaultLanguage);
      return;
    }

    if (storedLang && storedLangCode) {
      // get the language from the API
      setCurrentLanguage(JSON.parse(storedLang))
      // set the current language code
      setCurrentLanguageCode(storedLangCode as LANG_CODES);
    }
  }, []);

  //CAT | ESP | ENG | FRA
  const changeLanguage = (code: LANG_CODES) => {
    // 1. Get the stored language code from localStorage
    const storedLangCode = localStorage.getItem("lang_code");

    // 2. If the stored language code is different from the current language code, get a new language
    if (storedLangCode && code !== storedLangCode) {
      getLanguage(code);
    }

    // 3. Set the current language code to the code passed in as an argument
    setCurrentLanguageCode(code);

    // 4. Store the current language code in localStorage
    localStorage.setItem("lang_code", code);
  };

  const getString = (tag: string, defaultValue?: string) => {
    // Find the current language from the array of languages
    const str = currentLanguage.find((item) => item.TAG === tag);
    // Return the message if it exists, otherwise return null
    return str?.MESSAGE ?? defaultValue ?? `Invalid Tag ${tag}`
  };

  return (
    <LanguageContext.Provider
      value={{
        changeLanguage,
        getString,
        currentLanguageCode
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
