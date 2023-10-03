import prisma_db from "../../../prisma/db";
import { getOrCreateUser } from "./Auth";
import getCurrentUser from "./getCurrentUser";

 
const getUsers = async () => {
    try {
    
        
        const users = await prisma_db.user.findMany();
        return users
    } catch (error : any) { return []; }
}

export default getUsers