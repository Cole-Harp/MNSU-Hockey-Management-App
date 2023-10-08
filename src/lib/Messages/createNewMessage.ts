import prisma_db from "../../../prisma/db";
import getCurrentPrismaUser from "../db_actions/getCurrentPrismaUser";



export async function POST( request: Request) {
    try { 
        const currentUser = await getCurrentPrismaUser()
        if(currentUser === undefined) {
            throw new Error('createNewMessage: Invalid User')
        }
        const body = await request.json()
        const{ message, conversationId} = body

        const createNewMessage = await prisma_db.message.create({
            data: {
                userId: currentUser!.id,
                body: message,
                conversation: {
                    connect:{
                        id: conversationId
                    }
                }
            }
        })

        const updatedConversation = await prisma_db.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                messages: {
                    connect: {
                        id: createNewMessage.id
                    }
                }
            },
            include: {
                messages: true
            }
        })

        return createNewMessage
    }
    catch (error: any) {
        throw new error('createNewMessage: unable to create new message')
    }
}