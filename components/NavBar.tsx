import React, { useContext } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'



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


        {<div>NAV BAR</div> }
        </div>
    </div>
  )
}

export default NavBar