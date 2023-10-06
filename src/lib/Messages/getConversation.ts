"use server"

import { auth } from "@clerk/nextjs";
import prisma_db from "../../../prisma/db";
import { Conversation } from "@prisma/client";

const getConversation = async (): Promise<Conversation> => {
    try {

          const currentConversation = await prisma_db.conversation.findFirst({
            include: {messages: false}
          })
          if(currentConversation === null)
          {
            throw new Error('getConversation: conversation is null')
          }
          return currentConversation
        }
    catch (error: any) {
        throw ('Cannot get conversation')
    }
}

export default getConversation