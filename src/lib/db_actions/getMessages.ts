import prisma_db  from "../../../prisma/db";


const getMessages = async (
    conversationId: string
) => {
    try {
        const messages = await prisma_db.message.findMany({
            where: {
            conversationId: conversationId
            },
            include: {
                sender: true
            },
            orderBy: {
                createdAt: 'asc'
            },
        });

        return messages;
    } catch (error: any) {
        return []
    }
}

export default getMessages;