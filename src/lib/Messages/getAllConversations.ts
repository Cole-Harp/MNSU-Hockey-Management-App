'use server'

import { auth } from "@clerk/nextjs";
import prisma_db from "../../../prisma/db";
import { Conversation } from "@prisma/client";

export async function getAllConversations() {
    try {


        const { userId }: { userId: string | null } = auth();
        if (userId === null) {
            throw new Error("Something went wrong authenticating");
        }


        const conversationsByUser: Conversation[] = await prisma_db.user.findUnique({where: {id: userId}}).conversations()
        console.log('Number of conversations by this user: ' + conversationsByUser.length)
       
        return conversationsByUser
    }
    catch (error: any) {
        throw ('getAllConversations: unable to get all conversations')
    }
}