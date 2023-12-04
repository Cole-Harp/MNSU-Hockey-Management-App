"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
const prisma = new PrismaClient();

export const userConvos = async () => {
    //const userId = '1'; // replace with the actual user ID
    const { userId }: { userId: string | null } = auth();
    if (!userId) {
        throw new Error('Failed to get user info');
    }
    const userConversations = await prisma.conversation.findMany({
        where: {
            users: {
                some: {
                    id: userId
                }
            }
        }
    });
    console.log(userConversations)
    return userConversations
}

export const createConvo = async (groupName: any, selectedUsers: any[]) => {
    const { userId }: { userId: string | null } = auth();
    console.log(userId)
    if (!userId) {
        throw new Error('Failed to get user info');
    }
    const newConversation = await prisma.conversation.create({
        data: {
            name: groupName,

            users: {
                connect: [
                    { id: userId },
                    ...selectedUsers.map(id => ({ id }))
                ]
            }
        }
    });
    return newConversation
}

export const getConversationWithMessages = async (conversationId: string) => {
    
    const conversationWithMessages = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: { 
            messages: true,
            users: true,
         }
    });

    if (!conversationWithMessages || !conversationWithMessages.messages) {
        return null
    }

    return conversationWithMessages;
}

export const createMessage = async (messageContent: any, conversationId: string) => {
    const  userId = auth().userId!;
    const user = (await clerkClient.users.getUser(userId));
    if (!user || !user.firstName || !user.lastName || !user.username) {
        throw new Error('Failed to get user info');
    }
    console.log(user, "TEST")
    const newMessage = await prisma.message.create({
        data: {
            body: messageContent,
            userId: user.id,
            userName:  user.lastName,
            conversation: {
                connect: { id: conversationId }
            }
        }
    });
    return newMessage;
}
