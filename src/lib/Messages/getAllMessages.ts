import { auth } from "@clerk/nextjs";
import prisma_db from "../../../prisma/db";

export async function getAllMessages(conversationId: string) {
    try {
        
         
        const { userId }: { userId: string | null } = auth();
        if (userId === null) {
            throw new Error("Something went wrong authenticating");
          }

          const newMessage = await prisma_db.message.findMany({
            where: {
                id: conversationId
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