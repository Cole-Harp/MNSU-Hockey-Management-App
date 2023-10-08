import { useMemo } from 'react'
import { FullConversation } from '../types'
import { User } from '@prisma/client'
import getCurrentUserId from '@/lib/db_actions/getCurrentUserId'
import { Session } from '@clerk/nextjs/server'
import { useSession } from '@clerk/nextjs'

const useOtherUser = (conversation: FullConversation | { users: User[]}) => {
    const session = useSession()
    const otherUser = useMemo(() => {
        const currentUserId = session?.session?.user?.id;

        const otherUser = conversation.users.filter((user) => user.id != currentUserId)
        return otherUser[0]
    }, [session?.session?.user?.id, conversation.users])
    return otherUser
}

export default useOtherUser