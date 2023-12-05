'use client'

import { useOrganizationList } from "@clerk/nextjs";
import React, { FormEventHandler, useState } from "react";
import { Building } from 'lucide-react'
import OrganizationBox from "./OrganizationBox";
import NewOrganization from "./NewOrganization";


const OrganizationList  = () => {
  
    const [ newOrg, setNewOrg ] = useState(false)
    const { isLoaded, setActive, userMemberships } = useOrganizationList({
        userMemberships: {
          infinite: false,
        },
      });

      const { createOrganization } = useOrganizationList();
      const [organizationName, setOrganizationName] = useState("");

      const handleExit = async () => {
        setNewOrg(false)
      }
  
      const handleSubmit: FormEventHandler<HTMLFormElement> = (c) => {
          c.preventDefault();
          if (organizationName == '') {
              throw new Error('cant be empty dawg')
          }
          if (organizationName != '') {
              createOrganization({ name: organizationName });
          }
          setNewOrg(false)
          setOrganizationName("");
      };
    const handleNewOrg = async () => {
    setNewOrg(true)
  }
  return (
    <div className = 'flex flex-row h-full'>
      { newOrg && (<div className='backdrop-blur-sm w-full h-full flex absolute items-center justify-center'>
            <div className='flex flex-col w-1/2 h-1/2 bg-mnsu_gold  shadow-slate-300 shadow-xl rounded-xl border-mnsu_purple border-2'>
                <div className = 'flex justify-end'>
                    <button onClick = {() => handleExit()} className = 'flex justify-center text-center items-center rounded-xl w-8 h-8 hover:text-2xl'>x</button>
                </div>
                <div className='flex font-bold text-xl items-center justify-center h-1/3'>Create a New Organization</div>

                <form onSubmit={handleSubmit} className='flex h-1/3 w-full'>
                    <div className='flex w-full justify-center items-center'>
                        <input
                            className='flex justify-center h-12 items-center border-mnsu_purple rounded border-2 p-2 focus:border-blue-500 focus:outline-none'
                            placeholder='Organization Name'
                            type="text"
                            name="organizationName"
                            value={organizationName}
                            onChange={(c) => setOrganizationName(c.currentTarget.value)}
                        />
                        <button className='border-slate-800 h-12 border-2 mx-4 p-2 bg-white active:scale-95 rounded' type="submit">Create organization</button>
                    </div>
                </form>
            </div>
        </div>) }
      <div onClick={() => {handleNewOrg(); console.log('Clicked the button: ' + newOrg)}} 
         className = 'flex rounded p-1 m-4 shadow-md shadow-neutral-400 hover:scale-105 basis-1/6 h-1/3 bg-gradient-to-b  from-mnsu_purple to-mnsu_gold items-center justify-centerrounded-lg transition cursor-pointer active:scale-95'> 
        <div className = 'flex-col text-xl hover:text-white h-full w-full rounded hover:bg-gradient-to-b  from-mnsu_purple to-mnsu_gold rounded bg-white transition-all ease-in duration-75 active:scale-95'>
         <div className = 'flex-row text-center h-full'>
          Create New Organization
         <div className = 'flex justify-center'>
          <button className = 'flex items-center justify-center bg-gradient-to-br from-mnsu_purple to-purple-600 text-3xl border-mnsu_gold border-2 font-bold w-16 h-16 rounded-full text-white '>
            +
          </button>
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