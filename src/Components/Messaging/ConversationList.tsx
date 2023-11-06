'use client'

import { useRouter } from 'next/navigation';
import UserBox from './ConversationBox'
import { FullConversation } from '@/app/types';
import useConversation from '@/app/hooks/useConversation';
import CreateConvo from './CreateConvo';
import { createConvo } from '@/lib/db_actions/Message';
import ConversationBox from './ConversationBox';
import { useEffect, useState } from 'react';
import { getAllConversations } from '@/lib/Messages/getAllConversations';


// This component renders a list of all conversations that the current user has, using the UserBox component
// TODO: Add a way to create a new conversation 




const ConversationList: React.FC = () => {
    const handleCreateConvo = async (convoName: any, selectedUsers: any[]) => {
        const newConvo1 = await createConvo(convoName, selectedUsers);
    };



    const [conversations, setConversations] = useState<any>([]);

    useEffect(() => {
      const fetchConversations = async () => {
        const convos = await getAllConversations();
        setConversations(convos);
      };
      fetchConversations();
    }, []);

    const router = useRouter();
    const users = conversations.users
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
        {conversations.map((item: FullConversation) => ( 
            <div>
            <ConversationBox data={item}/>
            </div>
            ))}
            
        
    </div>
    <CreateConvo onCreateConvo={handleCreateConvo}/>
</aside>
    
    )
}



export default ConversationList