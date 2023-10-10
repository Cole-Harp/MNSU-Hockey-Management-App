'use server'

import { auth } from "@clerk/nextjs";
import prisma_db from "../../../prisma/db";
import { Conversation } from "@prisma/client";
import getCurrentPrismaUser from "../db_actions/getCurrentPrismaUser";

export async function getConversationById(conversationId: string) {

    console.log('getConversationById: ' + conversationId)

    try {

       const conversationById = await prisma_db.conversation.findFirst({
        where: {
            id: '7e74b268-0983-40c5-aee6-2dc7f7b23390'
        },
        include: {
            users: true,
            messages: true
        }
       })
       
        return conversationById
    }
    catch (error: any) {
        throw ('getConversationById: unable to get current conversations')
    }
}