'use client'

import { Message, Conversation, User } from '@prisma/client'
import { useMemo, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FullConversation, FullUser } from '@/app/types'
import { format } from 'date-fns'
import clsx from 'clsx'
import useOtherUser from '@/app/hooks/useOtherUser'
import { Session } from '@clerk/nextjs/server'
import { clerkClient, useSession, useUser} from '@clerk/nextjs'




// This component will render a box that links to a conversation. It will show the avatar of the other user in a conversation, 
// the last message sent in the conversation, the name of the other user in the conversation, and the time of the last message sent


interface ConversationBoxProps{
    data: FullConversation
    selected?: boolean
    
}

const ConversationBox: React.FC<ConversationBoxProps> = ({data, selected}) => {

  
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();
  
  

  // When the box is clicked, the user is sent to the corresponding conversation

  const handleClick = useCallback(() => {
    router.push(`/Messaging/${data.id}`)
  }, [data.id, router])

  const lastMessage = useMemo(() => {
    const messages = data.messages || []
    return messages[messages.length - 1]
  }, [data.messages])


  return (
  <div   onClick = {handleClick}
         className = 'w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer'> 
    <img className = 'w-12 h-12 rounded-full' src = 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg' />
      <div className = 'focus:outline-none'>
        {data.name}
        <div className = 'truncate text-black text-sm font-medium'>  {lastMessage?.body}</div>
        <div className = 'flex justify-between items-center mb-1'>
          {/* <p  className = 'text-sm font-medium text-gray-900'>{otherUser.name}</p> */}
          {lastMessage?.createdAt && ( <p className = 'text-xs text-gray-400 font-light'> {format(new Date(lastMessage.createdAt),'p')}</p>)}
        </div>
      </div>
  </div>)
}

export default ConversationBox
