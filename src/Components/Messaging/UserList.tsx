'use client'

import { Children } from 'react';
import UserBox from './UserBox'
import { Conversation, User } from '@prisma/client'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { FullConversation } from '@/app/types';



interface UserListProps { convos: FullConversation[]}

const UserList: React.FC<UserListProps> = ({convos}) => {


    const handleClick = (conversationId: string) => {
        
      };
 

  return( 
  <aside 
         className = 'inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0'>
    <div className = 'px-5'>
        <div className = 'flex-col'>
            <div className = 'text-2xl font-bold text-neutral-800 py-4'>   
            People
            </div>
        </div>
        {convos.map((item) => ( 
            <UserBox 
            key = {item.id}
            data = {item} 
            />))}
        
    </div>
</aside>
    
    )
}

export default UserList