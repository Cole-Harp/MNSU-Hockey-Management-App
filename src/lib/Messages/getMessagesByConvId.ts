"use server"

import { auth } from "@clerk/nextjs";
import prisma_db from "../../../prisma/db";


// This function returns all messages when given the conversationId


export async function getMessagesByConvId(conversationId: string) {
    try {

          const allMessages = await prisma_db.message.findMany({
            where: {
                conversationId: conversationId
            },
            orderBy: {
                createdAt: 'asc'
            }
          })
          return allMessages
        }
    catch (error: any) {
        throw ('Cannot get messages')
    }
}

