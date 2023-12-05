'use client'

import { FaTrash } from 'react-icons/fa';
import { useMemo, useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import clsx from 'clsx'
import useOtherUser from '@/app/hooks/useOtherUser'
import { Session } from '@clerk/nextjs/server'
import { clerkClient, useOrganization, useOrganizationList, useSession, useUser} from '@clerk/nextjs'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { confirmAlert } from 'react-confirm-alert';
import { isAdmin } from '@/lib/db_actions/Auth'





// This component will render a box that links to a conversation. It will show the avatar of the other user in a conversation, 
// the last message sent in the conversation, the name of the other user in the conversation, and the time of the last message sent


interface ConversationBoxProps{
    data: any
}

const OrganizationBox: React.FC<ConversationBoxProps> = ({data}) => {
  const [disabled, setDisabled] = useState(false);
  const session = useSession();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  // When the box is clicked, the user is sent to the corresponding conversation

  const handleClick = useCallback(() => {
    router.push(`/Organization/${data.id}`)
  }, [data.id, router])

  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: false,
    },
  });

  const remove = async (membership: any) => {
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

  const { membershipList, membership } = useOrganization({
    membershipList: {},
  });
  useEffect(() => {
    // Check if the user has an 'admin' role in the organization
    const userIsAdmin = membership?.role === 'admin';
    setIsAdmin(userIsAdmin);
  }, [membership]);

    const submit = () => {
  
};
  
  
  

  return (
    <div
        onClick={() => { setActive({ organization: data.organization.id }); handleClick() }}
        className='flex p-1 m-4 shadow-md shadow-neutral-400 hover:scale-105 basis-1/6 h-1/3 bg-gradient-to-b  from-mnsu_purple to-mnsu_gold items-center justify-center space-x-3 bg-red-400 rounded-lg transition cursor-pointer active:scale-95'
    >
        <div className='flex rounded text-xl items-center justify-center h-full w-full hover:text-2xl hover:text-white hover:bg-gradient-to-b  from-mnsu_purple to-mnsu_gold hover:bg-blue-400rounded bg-white transition-all ease-in duration-75 active:scale-95'>
            {data.organization.name}
      </div>
                  
    </div>
  )
}

export default OrganizationBox