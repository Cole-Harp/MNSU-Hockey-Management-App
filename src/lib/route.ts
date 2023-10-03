"use server";

import { NextResponse } from 'next/server'
import getCurrentUser from '@/lib/db_actions/getCurrentUser';
import prisma_db from '../../prisma/db';
import getUser from '@/lib/db_actions/getOtherUser';
import { error } from 'console';
import { auth } from '@clerk/nextjs';



export async function createMessage(message: string) {
    try {
        
        
        const { userId }: { userId: string | null } = auth();
        if (userId === null) {
            throw new Error("Something went wrong authenticating");
          }

          const newMessage = await prisma_db.message.create({
            data: {
                body: message,
                userId: userId
            }
          })
        }
    catch (error: any) {
        throw (error)
    }


}

export async function getAllMessages() {
    try {
        
         
        const { userId }: { userId: string | null } = auth();
        if (userId === null) {
            throw new Error("Something went wrong authenticating");
          }

          const newMessage = await prisma_db.message.findMany({
            orderBy: {
                createdAt: 'asc'
            }
          })
          return newMessage
        }
    catch (error: any) {
        throw ('Cannot get messages')
    }

    
}