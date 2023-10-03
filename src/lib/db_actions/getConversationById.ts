import prisma_db from "../../../prisma/db";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (
    conversationId: string
) => {
    try{

        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return null
        }

        const conversation = await prisma_db.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                user: true
            }
        })
        return conversation;
    } catch (error: any) {
        return null;
    }
}

export default getConversationById