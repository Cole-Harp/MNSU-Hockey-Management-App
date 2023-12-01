"use client";


import { FC, JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react'
import UserBox from './ConversationBox'
import { Message, User } from '@prisma/client'
import { auth } from '@clerk/nextjs'
import getCurrentUser from '@/lib/db_actions/getCurrentUserId'
import { getConversationWithMessages } from '@/lib/db_actions/Message'


// This component renders messages. Messages from the current user will show on the right of the screen, all other messages
// will render on the left side of the screen
// TODO: Have user's name display by message
// TODO: Format DateTime to show just time, not the date and the time

interface MessageListProps { items: Message[], convoId: string, userId: string}

const MessageList: React.FC<MessageListProps> = ({items, convoId, userId}) => {
    const [messages, setMessages] = useState<any>(items)

   
    
    useEffect(() => {
        const fetchMessages = async () => {
          const convo_messages = await getConversationWithMessages(convoId);
          setMessages(convo_messages?.messages);
        };
      
        fetchMessages(); // Fetch messages initially
      
        const intervalId = setInterval(() => {
          fetchMessages(); // Fetch messages every 1 second
        }, 1000);
      
        return () => clearInterval(intervalId); // Cleanup function
      }, [convoId]);

    
    return( 
        <aside className = 'flex flex-col w-full'>
          <div className = 'px-5'>
              <div className = 'flex-col'>
                  <div className = 'text-2xl font-bold text-neutral-800 py-4'>   
                  Current Conversation
                  </div>
              </div>
              <div className=' overflow-y-auto'>
                {messages.map((item: { userId: string; userName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; body: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; createdAt: { toLocaleString: () => string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }; }) => ( 
                <div className = 'w-full px-5 flex flex-col justify-between'>
                    <div className = 'flex flex-col mt-3'>
                        <div className = {item.userId === userId ? 'flex justify-end mb-4' : 'flex justify-start mb-4'}>
                            <div className = 'flex-row'>
                                <div className = {item.userId === userId ? 'flex justify-end' : 'flex justify-start'}>
                                    {item.userName}
                                </div>
                                <div className = {item.userId === userId ? 'py-3 px-4 bg-blue-400 rounded-bl-xl rounded-tl-xl rounded-tr-xl text-white' : 'py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white'}>
                                    {item.body}
                                </div>
                                <div className = {item.userId === userId ? 'flex justify-end' : 'flex justify-start'}>
                                    {item.createdAt.toLocaleString()}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                  ))
                
                  }
                  </div>
            
          </div>
      </aside>
          )
      
}

export default MessageList;