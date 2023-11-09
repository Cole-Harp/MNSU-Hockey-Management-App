'use client'

import { useOrganization } from "@clerk/nextjs";
import React, { useState } from "react";
import { Building } from 'lucide-react'
import { OrganizationMembershipResource } from "@clerk/types";
import InviteUser from "./InviteUser";

const MemberList  = () => {
  
  const [disabled, setDisabled] = useState(false);
  const { membershipList, membership } = useOrganization({
      membershipList: {},
  });

  const remove = async (membership: OrganizationMembershipResource | null | undefined) => {
    setDisabled(true);
    try {
      await membership!.destroy();
    } 
    catch (error) {
      // Handle any errors that occur during the deletion process
      console.error('Error removing member:', error);
    } finally {
      setDisabled(false);
    }
  };
    
  return (
    <div className = 'flex w-full h-full '>
      
    <div className='w-1/3 border-2 border-black h-full m-1 px-2 rounded-lg'>
      <div className='flex justify-center items-end text-3xl font-bold my-1 border-b-2 h-16 border-neutral-400'>
        Team Members
      </div>
      <InviteUser />
      <aside>
        {membershipList?.map((m) => (
          <div key={m.id}> 
            <div className='flex flex-row my-1 border-2 border-neutral-400 rounded hover:bg-neutral-100 hover:border-neutral-600'>
              <div className='flex px-2 items-center justify-center'>
                <img className='bg-green-400 m-2 w-16 h-16 rounded-full' src={m.publicUserData.imageUrl} alt={`${m.publicUserData.firstName} ${m.publicUserData.lastName}`}/>
              </div>
              <div className='flex basis-3/5 text-center items-center px-2'> 
                {m.publicUserData.firstName} {m.publicUserData.lastName} :: {m.role}
              </div>
              <div className='flex basis-1/4 justify-end'>
                <button 
                  className='border-2 border-red-800 bg-red-200 px-4 m-2 hover:bg-red-400 rounded-full shadow-md shadow-slate-600 active:scale-95'
                  onClick={() => remove(m)}
                  disabled={disabled}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </aside>
    </div>
    </div>
  )
}

export default MemberList



