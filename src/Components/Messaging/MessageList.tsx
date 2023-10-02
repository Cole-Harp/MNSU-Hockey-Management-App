


import { FC } from 'react'
import UserBox from './UserBox'
import { Message, User } from '@prisma/client'
import { auth } from '@clerk/nextjs'
import getCurrentUser from '@/lib/db_actions/getCurrentUser'



interface MessageListProps { items: Message[]}

const MessageList: React.FC<MessageListProps> = ({items}) => {

    const { userId }: { userId: string | null } = auth();
        if (userId === null) {
            throw new Error("Something went wrong authenticating");
          }
   
          // {item.userId === userId ? 'flex w-full justify-end' : 'flex w-full'}

    
    return( 
        <aside className = 'flex flex-col w-full'>
          <div className = 'px-5'>
              <div className = 'flex-col'>
                  <div className = 'text-2xl font-bold text-neutral-800 py-4'>   
                  Current Conversation
                  </div>
              </div>
              {items.map((item) => ( 
                <div className = 'w-full px-5 flex flex-col justify-between'>
                    <div className = 'flex flex-col mt-3'>
                        <div className = {item.userId === userId ? 'flex justify-end mb-4' : 'flex justify-start mb-4'}>
                            <div className = 'flex-row'>
                                <div className = {item.userId === userId ? 'flex justify-end' : 'flex justify-start'}>
                                    I'm a Name
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
      </aside>
          )
      
}

export default MessageList;