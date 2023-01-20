import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../components/NavBar'
import { LanguageContextProver } from '../context/LangaugeContext'


function MyApp({ Component, pageProps }: AppProps) {
  




  return (
  <LanguageContextProver>
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
   }
  ]}
  />
 
 <Component {...pageProps} />
  </div>  
  </LanguageContextProver>
  )
}



function AppWrapper(appParameters: AppProps) {

  return (
      <MyApp {...appParameters} />

  )
}

export default AppWrapper
