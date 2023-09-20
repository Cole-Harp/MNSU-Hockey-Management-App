"use server";

import { currentUser, useUser } from "@clerk/nextjs";
import prisma_db from "../../../prisma/db";
import { cache } from 'react'




export const createEvent = cache(async (title: string, content: any, date: any, start: any, end: any, role: any) => {
    const _id = (await currentUser()).id
    const newEvent = await prisma_db.event.create({
        data: {
            title,
            content: content,
            date: date,
            start: start,
            end: end,
            role: role,
            authorId: _id,
    }
    });

    return newEvent
})