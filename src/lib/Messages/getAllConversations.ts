import { auth } from "@clerk/nextjs";
import prisma_db from "../../../prisma/db";
import { Conversation } from "@prisma/client";

export async function getAllConversations() {
    try {


        const { userId }: { userId: string | null } = auth();
        if (userId === null) {
            throw new Error("Something went wrong authenticating");
        }

        const allConversations = await prisma_db.user.findMany({
            select: {
                conversations: {
                    where: {
                        users: {
                            some: {
                                id: userId
                            }
                        }
                    }
                }
            }
        }
        )
        console.log(allConversations, 'here')
        return allConversations
    }
    catch (error: any) {
        throw ('getAllConversations: unable to get all conversations')
    }
}