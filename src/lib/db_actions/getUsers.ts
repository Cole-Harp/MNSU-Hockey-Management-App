import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
 
const getUsers = async () => {
    try {
        const users = await prisma.user.findMany({});
        console.log(users)
        return users
    } catch (error : any) { return []; }
}

export default getUsers