'use client'

import { Children } from 'react';
import UserBox from './UserBox'
import { Conversation, User } from '@prisma/client'



interface UserListProps { items: User[], convos: Conversation[]}

const UserList: React.FC<UserListProps> = ({items, convos}) => {


    const handleClick = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const conversationId = '1234'
        location.href =    `/Messaging/${conversationId}`
    
      };
    
  return( 
  <aside onClick = {handleClick}
         className = 'inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0'>
    <div className = 'px-5'>
        <div className = 'flex-col'>
            <div className = 'text-2xl font-bold text-neutral-800 py-4'>   
            People
            </div>
        </div>
        {items.map((item) => ( 
            <UserBox 
            key = {item.email}
            data = {item} 
            />))}
        {convos.map((convo) => (
            <div key = {convo.id}>
                {convo.id}
            </div>))}
        
    </div>
</aside>
    
    )
}

export default UserList