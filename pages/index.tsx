import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { LanguageContext } from '../context/LangaugeContext'
import React, {useContext} from 'react'

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

      <Link href='/multiform'>
        {getString("name")}
        
        </Link>
    </div>
  )
}

export default Home
