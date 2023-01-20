import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext } from 'react'
import { LanguageContext } from '../context/LangaugeContext'



//TODO 
// INTERNATIONALIZATION
// SHARING CONTEXT
// USE STATE IS ASYNC
// USE EFFECT TO SUBSCRIBE TO CHANGES


const Home: NextPage = () => {
  

  const {getString} = useContext(LanguageContext)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <span>{getString("name")} </span>
      <span>{getString('surname1')}</span>
      <span>{getString('surname2')}</span>
      <span>{getString('mobile_phone')}</span>
    </div>
  )
}

export default Home
