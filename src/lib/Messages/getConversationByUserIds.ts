'use server'

import { auth } from "@clerk/nextjs";
import prisma_db from "../../../prisma/db";
import { Conversation } from "@prisma/client";
import getCurrentPrismaUser from "../db_actions/getCurrentPrismaUser";

export async function getConversationByUserIds(userId1: string, userId2: string) {
    try {
        
        if (userId1 === null) {
            throw new Error("getConversationByUserId: User ID 1 Invalid");
        }
        if (userId2 === null) {
          throw new Error("getConversationByUserId: User ID 2 Invalid");
      }

        const conversationByUserIds = await prisma_db.conversation.findMany({
            where: {
              AND: [
                {
                  users: {
                    some: {
                        id: userId1
                    }
                  },
                },
                {
                 users: {
                    some: {
                        id: userId2
                    }
                  },
                },
              ],
            },
          })
        console.log('Conversation by users: ' + JSON.stringify(conversationByUserIds))
       
        return conversationByUserIds
    }
    catch (error: any) {
        throw ('getAllConversations: unable to get all conversations')
    }
}