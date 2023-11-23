"use server"

import { currentUser } from "@clerk/nextjs";
import prisma_db from "../../../../../prisma/db";
import getCurrentUserId from "../../../../lib/db_actions/getCurrentUserId";
import getCurrentPrismaUser from "../../../../lib/db_actions/getCurrentPrismaUser";

export async function createConversation(userIds: string[]) {
    try {
        
    
        if(userIds === undefined)
        {
            throw new Error('createConversation: error getting user information')
        }

          const newConversation = await prisma_db.conversation.create({
           data: {
            users: {
                connect: 
                    userIds.map(userId => ({ id: userId }))
            }
           }
           
           
          })
          return newConversation
        }
    catch (error: any) {
        throw ('Unable to create new conversation')
    }

    
}