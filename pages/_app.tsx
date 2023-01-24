import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../components/NavBar'
import { useEffect } from 'react'
import { LanguageContextProvider } from '../context/LangaugeContext'


function MyApp({ Component, pageProps }: AppProps) {
  


  



  return (
  <div>
  <NavBar
  title='Kennwort'
  orientation='vertical'
  links={[
   {
      text: 'Home',
      link: '/'
   },
   {
     text: 'Contact',
     link: '/contact'
   },
   {
      text: 'CountDown',
      link: '/countdown'
   },
   {
      text:  'Chart',
      link: '/pieChart'
   }
  ]}
  />
 
 <Component {...pageProps} />
  </div>  
  )
}



function AppWrapper(appParameters: AppProps) {

  return (
    <LanguageContextProvider 
    defaultLanguage='ENG'
    >
      <MyApp {...appParameters} />
    </LanguageContextProvider>

  )
}

export default AppWrapper