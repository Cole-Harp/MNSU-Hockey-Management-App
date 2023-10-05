import { NextResponse } from 'next/server'
import prisma_db from '../../../prisma/db'
import { currentUser } from '@clerk/nextjs';


export default async function getCurrentUser()
{
    const thisUser = await currentUser();
    return thisUser;
}