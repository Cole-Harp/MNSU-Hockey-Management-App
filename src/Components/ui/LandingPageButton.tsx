'use client'

import Link from "next/link";
import React from "react";



const HomePageButton  = ({buttonText, url}: any) => {
 
    
  return (
      <Link className = 'grid hover:text-2xl active:scale-95 shadow-md shadow-neutral-400 p-4  border-mnsu_gold border-4 bg-mnsu_purple  text-mnsu_gold font-bold rounded-md items-center justify-center' href = {url}>
        {buttonText}
      </Link>
  )
}

export default HomePageButton