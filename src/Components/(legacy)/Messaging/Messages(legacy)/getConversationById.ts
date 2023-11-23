'use server'

import { auth } from "@clerk/nextjs";
import prisma_db from "../../../../../prisma/db";
import { Conversation } from "@prisma/client";
import getCurrentPrismaUser from "../../../../lib/db_actions/getCurrentPrismaUser";

// This function returns an entire conversation object, given the conversationId. Useful for getting the connected users and messages
// when you only have the ID of the conversation


export async function getConversationById(conversationId: string) {

    try {

       const conversationById = await prisma_db.conversation.findFirst({
        where: {
            id: conversationId
        },
        include: {
            users:  true,
            messages: {
                orderBy: {
                    createdAt: 'asc' 
                }
            } 
        }
       })
       
        return conversationById
    }
    catch (error: any) {
        throw ('getConversationById: unable to get current conversations')
    }
}