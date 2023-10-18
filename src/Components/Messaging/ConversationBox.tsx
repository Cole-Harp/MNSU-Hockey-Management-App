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
import { useSession } from '@clerk/nextjs'



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


  const userName = useMemo(() => {
    return session.session?.user?.firstName
  }, [session.session?.user?.firstName])


  return (
  <div   onClick = {handleClick}
         className = 'w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer'> 
    <div className = 'w-12 h-12 rounded-full flex items-center justify-center bg-red-500'> DLC </div>
    <div className = 'min-w-0 flex-1'>
      <div className = 'focus:outline-none'>
        <div className = 'flex justify-between items-center mb-1'>
          <p  className = 'text-sm font-medium text-gray-900'>{otherUser.name}</p>
          {lastMessage?.createdAt && ( <p className = 'text-xs text-gray-400 font-light'> {format(new Date(lastMessage.createdAt),'p')}</p>)}
        </div>
        <p className = 'truncate text-sm text-black font-medium'> {lastMessage?.body}</p>
      </div>
    </div>
  </div>)
}

export default ConversationBox