'use server'

import { auth } from "@clerk/nextjs";
import prisma_db from "../../../prisma/db";
import { Conversation } from "@prisma/client";
import getCurrentPrismaUser from "../db_actions/getCurrentPrismaUser";

export async function getAllConversations(conversationId: string) {
    try {

       const conversationById = await prisma_db.conversation.findUnique({
        where: {
            id: conversationId
        },
        include: {
            messages: true
        }
       })
        
        console.log('Messages from conversation: ' + conversationById?.messages[0].body)
       
        return conversationById
    }
    catch (error: any) {
        throw ('getAllConversations: unable to get all conversations')
    }
}