'use client'

import useOtherUser from '@/app/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import { useState } from 'react'
import { HiEllipsisHorizontal, HiEllipsisHorizontalCircle } from 'react-icons/hi2'
import ConversationList from './ConversationList'
import { getAllConversations } from '@/Components/(legacy)/Messaging/Messages(legacy)/getAllConversations'

interface HeaderProps {
    conversation: Conversation;
    users: User[] | null;
}

const Header: React.FC<HeaderProps> = ({ conversation, users }) => {
    const [isOpen, setIsOpen] = useState(false);


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-small'>
            <div className='flex gap-3 items-center'>
                {/* <ConversationList/> */}
                
                <div className='relative'>
                    <HiEllipsisHorizontal
                        size={32}
                        onClick={toggleDropdown}
                        className='text-sky-500 cursor-pointer hover:text-sky-500 transition'
                    />
                    {isOpen && (
                        <div className='absolute top-full left-0 bg-white border border-gray-200 shadow-md z-10'>
                            {users?.map((user) => (
                                <div className='bg-white border border-gray-200 p-4 rounded shadow-md' key={user.id}>
                                    <h2 className='text-lg font-medium'>{user.name}</h2>
                                    <p className='text-gray-500'>{user.email}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div>
            {conversation.name}
            </div>
        </div>
    );
};

export default Header;