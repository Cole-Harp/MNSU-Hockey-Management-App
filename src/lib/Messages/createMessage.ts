"use server"

import { useRouter } from "next/navigation";
import prisma_db from "../../../prisma/db";
import getCurrentUserId from "../db_actions/getCurrentUserId";
import getConversation from "./getConversation";
import { getConversationId } from "./getConversationId";



export async function createMessage(message: string) {
    try {
        

        const router = useRouter()
        
        console.log('createMessage: ' )

        const userId = await getCurrentUserId()
        if(userId === undefined)
        {
            throw new Error('createMessage: invalid user')
        }

        const currentConversation = await getConversation()
        if(currentConversation === undefined || currentConversation === null)
        {
            throw new Error('createMessage: invalid conversation')
        }

        const newMessage = await prisma_db.message.create({
            data: {
               body: message,
               userId: userId,
               conversationId: '1234'
            }
         })
         return newMessage
        }
    catch (error: any) {
        throw (error)
    }
}