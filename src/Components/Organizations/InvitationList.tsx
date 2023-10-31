'use client'

import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import React from "react";
import { Building } from 'lucide-react'


const InvitationList  = () => {

    const { invitationList } = useOrganization({ invitationList: {}});

    console.log('UserInvites: ' + JSON.stringify(invitationList))
    const revoke = async inv => {
        await inv.revoke();
      };
 
    
  return (
    <div className = ' w-1/3 bg-red-400'>
      <ul>
        {invitationList?.map((inv) => (
            <li key = {inv.id}> 
                <div className = 'flex flex-row'>
                  <div className = 'flex w-10 items-center justify-center'>
                    <Building className = ''/>
                  </div>
                <div className = 'flex w-1/3 text-center items-center px-2'> {inv.emailAddress}</div>
                <button className = 'border-2 border-slate-800 px-4 m-2  hover:bg-slate-200 rounded-full shadow-md shadow-slate-600 active:scale-95'
              onClick={() => revoke(inv)}
            >
              Revoke
            </button>
            </div>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default InvitationList