"use server"

import { auth } from "@clerk/nextjs";
import prisma_db from "../../../prisma/db";

export async function getMessagesByConvId(conversationId: string) {
    try {

          const newMessage = await prisma_db.message.findMany({
            where: {
                conversationId: conversationId
            },
            orderBy: {
                createdAt: 'asc'
            }
          })
          return newMessage
        }
    catch (error: any) {
        throw ('Cannot get messages')
    }
}

