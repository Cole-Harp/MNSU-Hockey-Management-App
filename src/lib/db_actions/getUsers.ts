import prisma_db from "../../../prisma/db";
import { getOrCreateUser } from "./Auth";
import getCurrentUserId from "./getCurrentUserId";
import getCurrentUser from "./getCurrentUserId";

 
const getUsers = async () => {
   
   const currentUserId = await getCurrentUserId()
   
    try {
        
        const users = await prisma_db.user.findMany({
            where: {

             NOT:
            {
                id: currentUserId?.toString()
            }
        },
        include: {conversations: true}
        });
        return users
    } catch (error : any) { return []; }
}

export default getUsers