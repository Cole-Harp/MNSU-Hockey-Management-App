"use server"

import prisma_db from "../../../prisma/db";
import { getOrCreateUser } from "./Auth";


 
const getUser = async (id: string) => {
    try {
    
        
        const user = await prisma_db.user.findUnique({
            where: {
                id: id
            }
        });
        return user
    } catch (error : any) {}
}

export default getUser