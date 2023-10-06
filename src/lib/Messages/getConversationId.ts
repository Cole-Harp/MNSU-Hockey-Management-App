"use server"

import { auth } from "@clerk/nextjs";
import prisma_db from "../../../prisma/db";

export async function getConversationId(firstUser: string, secondUser: string) {
    
  if(!firstUser)
  {
    throw new Error('getConversationId: invalid user1')
  }
  if(!secondUser)
  {
    throw new Error('getConversationId: invalid user2')
  }
  
  try {
        
          const currentConversation = await prisma_db.conversation.findUnique({
            where: {
              id: '1234',
              userId1: firstUser,
              userId2: secondUser
            }
          })

          const conversationId = currentConversation?.id
          return conversationId
        }
    catch (error: any) {
        throw ('getConversationId: Cannot get conversation id')
    }
}