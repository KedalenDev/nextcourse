import React, { useContext } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { LanguageContext } from '../context/LangaugeContext'



type NavLink = {
    text: string,
    link: string
}


type NavBarItemProps = {
    title: string,
    link: string,
    active: boolean
}


type NavBarProps = {
    title: string,
    links: NavLink[],
    orientation?: 'vertical' | 'horizontal'
    
}


function ToggleLanguage({langName}:{langName:string}) {

    const {changeLanguage} = useContext(LanguageContext)

    return (
        <button 
        onClick={e => changeLanguage(langName)}
        className='bg-gray-900 font-black text-white px-2 rounded-md'>
            {langName}
        </button>
    )
}

function NavBarItem({
    title,
    link,
    active
}:NavBarItemProps){


    

    return (
        <NextLink href={link}>
        <div className={` ${active ? 'bg-blue-200' : 'bg-gray-300'} px-2 py-1 rounded-lg`}>
            {title}
        </div>
        </NextLink>
    )

}


function NavBar({
    title,
    links,
    orientation
}: NavBarProps) {

   const router = useRouter();

 






  return (
    <div
    className='sticky bg-gray-200 h-10 flex items-center justify-around px-3'
    >
        {title}
        <div className='flex gap-3 '>


        <ToggleLanguage langName='CAT'/>
        <ToggleLanguage langName='ESP'/>
        <ToggleLanguage langName='ENG'/>
        <ToggleLanguage langName='FRA'/>

        </div>
    </div>
  )
}

export default NavBar