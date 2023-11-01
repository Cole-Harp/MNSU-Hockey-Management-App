'use client'

import { useOrganizationList } from "@clerk/nextjs";
import React from "react";
import { Building } from 'lucide-react'
import OrganizationBox from "./OrganizationBox";


const OrganizationList  = () => {

    const { isLoaded, setActive, userMemberships } = useOrganizationList({
        userMemberships: {
          infinite: false,
        },
      });

 
    
  return (
    <div className = 'flex flex-row h-full'>
      <div onClick={() => console.log('Create an Org')} 
         className = 'flex p-1 m-4 shadow-md shadow-neutral-400 hover:scale-105 basis-1/6 h-1/3 bg-gradient-to-b  from-mnsu_purple to-mnsu_gold items-center justify-centerrounded-lg transition cursor-pointer active:scale-95'> 
        <div className = 'flex-col text-xl pt-20 justify-center items-center text-center hover:text-white h-full w-full hover:bg-gradient-to-b  from-mnsu_purple to-mnsu_gold hover:bg-blue-400rounded bg-white transition-all ease-in duration-75 active:scale-95'>
         <div className = 'flex-row w-full items-center justify-center text-center'>
          Create New Organization
         <div className = 'flex items-center justify-center'>
          <div className = 'flex bg-gradient-to-br mt-6 from-mnsu_purple to-purple-600 text-3xl border-mnsu_gold border-2 font-bold w-16 h-16 rounded-full items-center justify-center text-white '>
            +
          </div>
          </div>
         </div>
        </div>
        </div>
        {userMemberships.data?.map((mem) => (
            <OrganizationBox key = {mem.id} data = {mem} />
       ))}
    </div>
  )
}

export default OrganizationList