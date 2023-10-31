'use client'

import { useOrganizationList } from "@clerk/nextjs";
import React from "react";
import { Building } from 'lucide-react'


const OrganizationList  = () => {

    const { isLoaded, setActive, userMemberships } = useOrganizationList({
        userMemberships: {
          infinite: true,
        },
      });

 
    
  return (
    <div className = ' w-1/3'>
      <ul>
        {userMemberships.data?.map((mem) => (
            <li key = {mem.id}> 
                <div className = 'flex flex-row'>
                  <div className = 'flex w-10 items-center justify-center'>
                    <Building className = ''/>
                  </div>
                <div className = 'flex w-1/3 text-center items-center px-2'> {mem.organization.name}</div>
                <button className = 'border-2 border-slate-800 px-4 m-2  hover:bg-slate-200 rounded-full shadow-md shadow-slate-600 active:scale-95'
              onClick={() => setActive({ organization: mem.organization.id })}
            >
              Select
            </button>
            </div>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default OrganizationList