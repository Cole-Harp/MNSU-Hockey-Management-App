"use server"

import { NextResponse } from 'next/server'
import prisma_db from '../../../../prisma/db'
import { currentUser, useUser } from '@clerk/nextjs';


const getCurrentUserId = async () =>
{

    try {
        const thisUser = await currentUser();
        const userId = thisUser?.id
        return userId;
    }
    catch (error: any) {'Cannot get current user ID'}
}

export default getCurrentUserId