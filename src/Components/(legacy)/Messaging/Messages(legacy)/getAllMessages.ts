"use server"

import { auth } from "@clerk/nextjs";
import prisma_db from "../../../../../prisma/db";


// This function returns all messages from a given conversation


export async function getAllMessages(conversationId: string) {
    try {
        
         
        const { userId }: { userId: string | null } = auth();
        if (userId === null) {
            throw new Error("Something went wrong authenticating");
          }

          const newMessage = await prisma_db.message.findMany({
            
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