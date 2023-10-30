'use client'

import { useOrganization, useUser } from '@clerk/nextjs';
import { clerkClient } from '@clerk/nextjs';
import { useState } from 'react';
import { CreateOrganizationInvitationParams } from '@clerk/types';



const BackendInviteUser = () => {    
    

    
    const { isLoaded, organization } = useOrganization();
   
    console.log(isLoaded)
    /* emailAddress will be taken from user input. This is where the invitation email will be sent to */ 
    const { user } = useUser()
    const [emailAddress, setEmailAddress] = useState('');
    /* role is based on Clerk backend, not our UserRole. Only 'admin' and 'basic_member are usable here */
    /* TODO: Figure out how to sync UserRole/basic_member/admin */
    /* Note to self (skeeter): admin == Admin, other user role == basic_member?? */
    const [role, setRole] = useState<'basic_member' | 'admin'>('basic_member');
    /* This state is for the radio buttons when selecting what role the invited member should have. Ensures only one button can be active at a time*/
    const [disabled, setDisabled] = useState(false);
    
    console.log('role: ' + role + ' organizationId: ' + organization?.id + ' user id: ' + user?.id + ' email address: ' + emailAddress)
    
    const sendInvite = async b => {
        console.log('Organization to be created: ' + {organization})
        setDisabled(true)
        if(!user || !organization || !role || !emailAddress)
        {
            throw new Error('Cannot send new invite')
        }
        await clerkClient.organizations.createOrganizationInvitation({ organizationId: organization!.id, inviterUserId: user!.id, emailAddress: emailAddress, role: role})
        console.log('invitation sent to: ' + emailAddress)
        setEmailAddress('');
        setRole('basic_member');
        setDisabled(false);
        
      };

    const onSubmit = async b => {
        console.log('Organization to be created: ' + {organization})
        setDisabled(true)
        if(!user || !organization || !role || !emailAddress)
        {
            throw new Error('Cannot send new invite')
        }
        await clerkClient.organizations.createOrganizationInvitation({ organizationId: organization!.id, inviterUserId: user!.id, emailAddress: emailAddress, role: role})
        console.log('invitation sent to: ' + emailAddress)
        setEmailAddress('');
        setRole('basic_member');
        setDisabled(false);
        
      };

    return (
       
      <div>
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
        {user?.id}
        <div>
            {JSON.stringify(organization)}
        </div>
    </div>
    )
    
}

export default BackendInviteUser

