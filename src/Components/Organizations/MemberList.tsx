'use client'

import { useOrganization } from "@clerk/nextjs";
import React from "react";
import { Building } from 'lucide-react'
import { useState } from "react";

const MemberList  = () => {
  const [disabled, setDisabled] = useState(false);
    const { membershipList, membership } = useOrganization({
        membershipList: {},
      });

    const remove = async () => {
      setDisabled(true);
      await membership.destroy();
    };
    
  return (
    <div className = ' w-1/3 bg-red-500'>
      <aside>
        {membershipList?.map((m) => (
            <div key = {m.id}> 
                <div className = 'flex flex-row'>
                  <div className = 'flex w-14 items-center justify-center'>
                    <div className = 'bg-green-400 w-12 h-12 rounded-full'/>
                  </div>
                <div className = 'flex w-1/3 text-center items-center px-2'> 
                    {m.publicUserData.firstName} {m.publicUserData.lastName} :: {m.role}
                </div>
                <button 
                  className='border-2 border-slate-800 px-4 m-2 hover:bg-slate-200 rounded-full shadow-md shadow-slate-600 active:scale-95'
                  onClick={remove}
                  disabled={disabled}
                >
                    Remove {/* Updated button text */}
                </button>
            </div>
            </div>
        ))}
      </aside>
    </div>
  )
}

export default MemberList
  