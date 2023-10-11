"use server"

import { NextResponse } from 'next/server'
import prisma_db from '../../../prisma/db'
import { currentUser, useUser } from '@clerk/nextjs';


const getCurrentPrismaUser = async () =>
{

    try {
        const thisUser = await currentUser();
        const userId = thisUser?.id
        
        const currentPrismaUser = await prisma_db.user.findUnique({
            where: {id: userId}
        })
        return currentPrismaUser
    }
    catch (error: any) {'Cannot get current user ID'}
}

export default getCurrentPrismaUser