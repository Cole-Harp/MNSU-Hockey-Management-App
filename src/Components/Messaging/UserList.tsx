'use client'

import { useRouter } from 'next/navigation';
import UserBox from './UserBox'
import { FullConversation } from '@/app/types';
import useConversation from '@/app/hooks/useConversation';


// This component renders a list of all conversations that the current user has, using the UserBox component
// TODO: Add a way to create a new conversation 


interface UserListProps { convos: any[]}

const UserList: React.FC<UserListProps> = ({convos}) => {

    const router = useRouter();
    const users = convos[1]
    console.log('UserList convos: ' + users)
    const { conversationId, isOpen } = useConversation()

  return( 
  <aside 
         className = 'inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0'>
    <div className = 'px-5'>
        <div className = 'flex-col'>
            <div className = 'text-2xl font-bold text-neutral-800 py-4'>   
            Messages
            </div>
        </div>
        {convos.map((item) => ( 
            <UserBox 
            key = {item.id}
            data = {item} 
            selected = {conversationId === item.id}
            />))}
        
    </div>
</aside>
    
    )
}

export default UserList