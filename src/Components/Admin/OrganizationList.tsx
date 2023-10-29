'use client'

import { useOrganizationList } from "@clerk/nextjs";
import React from "react";



const OrganizationList  = () => {

    const { isLoaded, setActive, userMemberships } = useOrganizationList({
        userMemberships: {
          infinite: true,
        },
      });

 
    
  return (
    <ul>
        {userMemberships.data?.map((mem) => (
            <li key = {mem.id}> 
                <span> {mem.organization.name}
                </span>
                <button className = 'border-2 border-slate-800 px-4 m-2'
              onClick={() => setActive({ organization: mem.organization.id })}
            >
              Select
            </button>
            </li>
        ))}
    </ul>
  )
}

export default OrganizationList