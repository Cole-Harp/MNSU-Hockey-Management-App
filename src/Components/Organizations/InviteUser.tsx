'use client'

import InviteNewUser from '@/lib/Organizations/InviteNewUser';
import { clerkClient, useOrganization, useUser } from '@clerk/nextjs';
import { useState } from 'react';



const InviteUser = () => {    

  /* This state determines if the invite user form is shown or hidden */
    const [ inviteUser, setInviteUser ] = useState(false)
    const { organization } = useOrganization();
    const orgId = organization?.id

    if (!orgId) {
  
      return (<div>Something went wrong</div>)
    }
    const userId = useUser().user!.id
    /* emailAddress will be taken from user input. This is where the invitation email will be sent to */ 
    const [emailAddress, setEmailAddress] = useState('');
    /* role is based on Clerk backend, not our UserRole. Only 'admin' and 'basic_member are usable here */
    const [role, setRole] = useState<'basic_member' | 'admin'>();
    /* This state dictates which button is selected. It also determines what metadata is sent with the invite */
    const [meta, setMeta] = useState<string>('Player')
    /* This state is for the radio buttons when selecting what role the invited member should have. Ensures only one button can be active at a time*/
    //const [disabled, setDisabled] = useState(false);

    const onSubmit = async b => {
      console.log(emailAddress + ' ' + orgId + ' ' + userId + ' ' + userId + ' ' + meta)
        b.preventDefault();
        //setDisabled(true);
        /* Docs from Clerk - https://clerk.com/docs/references/backend/organization/create-organization-invitation */
        await InviteNewUser(emailAddress, orgId, userId, role, meta).catch(err => {console.log('promise failed')})
        setEmailAddress('');
        setRole('basic_member');
        //setDisabled(false);
      };

    return (

      /*Container for Invite User Button. When clicked, it will change to invite user form */
      <div>
        { !inviteUser && (<div className='flex h-20 flex-row my-1 border-2 border-neutral-400 rounded items-center justify-center'>
        <button onClick = {() => setInviteUser(true)}
          className='flex w-12 h-12 shadow-md shadow-neutral-400 bg-gradient-to-br from-mnsu_purple to-purple-800 text-white text-xl font-bold rounded-full items-center justify-center active:scale-95 ' 
        >
          +
        </button>
      </div>) }
      { inviteUser && (
        <form onSubmit={onSubmit} className = 'flex flex-col relative w-full border-2 border-black p-2'>
          <div className = 'flex'>
            <div className = 'flex basis-1/2'>Enter Email to Invite</div>
            <div className = 'flex basis-1/2 justify-end'>
              <button onClick = {() => setInviteUser(false)} className = 'flex border-2 border-black w-8 h-8 items-center justify-center rounded'> X
              </button>
            </div>
          </div>
            
            <input type = 'text' placeholder = 'Email Address' value = {emailAddress} 
                   onChange = {b => setEmailAddress(b.target.value)}
                   className = 'ring-2 ring-slate-400 rounded-full my-4 px-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'/>
       {/* Buttons for selecting role */}
        <label className = 'mx-2'>
          <input
           type="radio"
            checked={meta === 'Admin'}
            onChange={() => {
              setRole('admin');
              setMeta('Admin')
            }}
          />{' '}
          Admin
        </label>
      <label className = 'mx-2'>
        <input
          type="radio"
          checked={meta === 'Player'}
          onChange={() => {
            setRole('basic_member'); 
            setMeta('Player')
          }}
        />{' '}
        Player
      </label>{' '}
      <label className = 'mx-2'>
        <input
          type="radio"
          checked={meta === 'Coach'}
          onChange={() => {
            setRole('basic_member');
            setMeta('Coach')
          }}
        />{' '}
        Coach
      </label>{' '}
      {/* Submit button */}
        <button type="submit"  className = 'w-16 border-2 border-slate-800 m-2  hover:bg-slate-200 shadow-md shadow-slate-600 active:scale-95'>
          Invite
        </button>
        </form>)}
        </div>
    )
    
}

export default InviteUser