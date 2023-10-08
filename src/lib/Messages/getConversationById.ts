'use server'

import { auth } from "@clerk/nextjs";
import prisma_db from "../../../prisma/db";
import { Conversation } from "@prisma/client";
import getCurrentPrismaUser from "../db_actions/getCurrentPrismaUser";

export async function getConversationById(conversationId: string) {
    try {

       const conversationById = await prisma_db.conversation.findUnique({
        where: {
            id: conversationId
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