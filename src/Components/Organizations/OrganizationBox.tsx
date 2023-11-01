'use client'

import { useMemo, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import clsx from 'clsx'
import useOtherUser from '@/app/hooks/useOtherUser'
import { Session } from '@clerk/nextjs/server'
import { clerkClient, useOrganizationList, useSession, useUser} from '@clerk/nextjs'





// This component will render a box that links to a conversation. It will show the avatar of the other user in a conversation, 
// the last message sent in the conversation, the name of the other user in the conversation, and the time of the last message sent


interface ConversationBoxProps{
    data: any
    
    
}

const OrganizationBox: React.FC<ConversationBoxProps> = ({data}) => {

  
 
  const session = useSession();
  const router = useRouter();
  
  

  // When the box is clicked, the user is sent to the corresponding conversation

  const handleClick = useCallback(() => {
    router.push(`/Messaging/${data.id}`)
  }, [data.id, router])

  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: false,
    },
  });
  
  return (
    
    <div onClick={() => setActive({ organization: data.organization.id })} 
         className = 'flex p-1 m-4 shadow-md shadow-neutral-400 hover:scale-105 basis-1/6 h-1/3 bg-gradient-to-b  from-mnsu_purple to-mnsu_gold items-center justify-center space-x-3 bg-red-400 rounded-lg transition cursor-pointer active:scale-95'> 
        <div className = 'flex text-xl items-center justify-center h-full w-full hover:text-2xl hover:text-white hover:bg-gradient-to-b  from-mnsu_purple to-mnsu_gold hover:bg-blue-400rounded bg-white transition-all ease-in duration-75 active:scale-95'>
          {data.organization.name}
        </div>
        
    </div>
    

)
}

export default OrganizationBox