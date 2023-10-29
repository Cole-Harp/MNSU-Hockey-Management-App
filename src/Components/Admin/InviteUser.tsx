'use client'

import { useOrganization } from '@clerk/nextjs';
import { useState } from 'react';



const InviteUser = () => {    

    const { organization } = useOrganization();
    /* emailAddress will be taken from user input. This is where the invitation email will be sent to */ 
    const [emailAddress, setEmailAddress] = useState('');
    /* role is based on Clerk backend, not our UserRole. Only 'admin' and 'basic_member are usable here */
    /* TODO: Figure out how to sync UserRole/basic_member/admin */
    /* Note to self (skeeter): admin == Admin, other user role == basic_member?? */
    const [role, setRole] = useState<'basic_member' | 'admin'>('basic_member');
    /* This state is for the radio buttons when selecting what role the invited member should have. Ensures only one button can be active at a time*/
    const [disabled, setDisabled] = useState(false);


    console.log('Organization details: ' + JSON.stringify(organization))

    const onSubmit = async b => {
        console.log('Organization to be created: ' + {organization})
        b.preventDefault();
        setDisabled(true);
        /* inviteMember is from Clerk - https://clerk.com/docs/organizations/inviting-users */
        await organization?.inviteMember({ emailAddress, role });
        setEmailAddress('');
        setRole('basic_member');
        setDisabled(false);
      };

    return (
       
      
        <form onSubmit={onSubmit} className = 'flex flex-col m-2 border-2 border-black rounded'>
            Enter Email to Invite
            <input type = 'text' placeholder = 'Email Address' value = {emailAddress} 
                   onChange = {b => setEmailAddress(b.target.value)}
                   className = 'border-2 border-slate-400 m-4'/>
            <label>
        <input
          type="radio"
          checked={role === 'admin'}
          onChange={() => {
            setRole('admin');
          }}
        />{' '}
        Admin
      </label>
      <label>
        <input
          type="radio"
          checked={role === 'basic_member'}
          onChange={() => {
            setRole('basic_member');
          }}
        />{' '}
        Member
      </label>{' '}
      <button type="submit" disabled={disabled}>
        Invite
      </button>
        </form>
        
    )
    
}

export default InviteUser