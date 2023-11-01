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
      infinite: true,
    },
  });


  return (
    
    <div className = 'flex p-2 border-2 border-black items-center space-x-3 bg-white hover:bg-neutral-100 rounded-lg transition cursor-pointer'> 
        {data.organization.name}
        <button
              onClick={() => setActive({ organization: data.organization.id })}
            >Test</button>
    </div>
    

)
}

export default OrganizationBox