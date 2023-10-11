'use client'

import useOtherUser from '@/app/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import { HiEllipsisHorizontal, HiEllipsisHorizontalCircle } from 'react-icons/hi2'

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}


const Header: React.FC<HeaderProps> = ( { conversation }) => {

    const otherUser = useOtherUser(conversation);
    

    return (
        <div className = 'bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-small'>
            <div className = 'flex gap-3 items-center'>
                <div className = 'flex flex-col'>
                    <div> {otherUser?.name}</div>
                    <HiEllipsisHorizontal size = {32} onClick = {() => {}} className = 'text-sky-500 cursor-pointer hover:text-sky-500 transition'
                    ></HiEllipsisHorizontal>         
                </div>
            </div>
        </div>
    )
    
}

export default Header