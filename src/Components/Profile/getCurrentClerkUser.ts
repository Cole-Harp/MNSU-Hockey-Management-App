"use server"

import { NextResponse } from 'next/server'
import prisma_db from '../../../prisma/db'
import { currentUser, useUser } from '@clerk/nextjs';


const getCurrentClerkUser = async () =>
{

    try {
        const thisUser = await currentUser();
        return thisUser;
    }
    catch (error: any) {'Cannot get current user ID'}
}

export default getCurrentClerkUser