'use server'

import prisma_db from "../../../prisma/db";

export async function deleteMessage(messageId: string) {

    try {

        const deleteMessage = await prisma_db.message.delete({
            where: {
                id: messageId
            }
        })

    }
    catch (error: any) {
        throw (error)
    }



}