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
    <div className = 'flex flex-row'>
        {userMemberships.data?.map((mem) => (
            <OrganizationBox key = {mem.id} data = {mem} />
       ))}
    </div>
  )
}

export default OrganizationList