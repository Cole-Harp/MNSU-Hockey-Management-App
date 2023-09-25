"use server";
import prisma_db from "../../../prisma/db";
import { cache } from 'react';
import { EventInput } from '@fullcalendar/core';
import { isAdmin } from './Auth';


function toEventList(events: any[]): EventInput[] {
    return events.map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description ?? '',
        start: event.start ?? new Date(),
        end: event.end ?? new Date(),
        allDay: event.allDay ?? false,
        role: event.role,
        bubbles: true,
        cancelBubble: false,
        cancelable: true,
        composed: true,
        currentTarget: null,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        returnValue: true,
        srcElement: null,
        target: null,
        timeStamp: 0,
        type: '',
    }));
}

export const userGetEvents = async (currViewStart: string, currViewEnd: string, options?: any): Promise<EventInput[]> => {
    const { isAdmin: adminStatus, user } = await isAdmin();
    const role = user?.role;
    const userId = user?.id;

    let events: any[];
    //TODO Break Down to functions
    try {
        if (adminStatus) {
            // TODO: Filter for Admin based on user or role using options?.
            // role: UserRole.Admin,
            events = await prisma_db.event.findMany({
                where: {
                    author: {
                        name: options,
                    },
                    AND: [
                        {
                            start: {
                                lte: currViewEnd,
                            },
                        },
                        {
                            end: {
                                gte: currViewStart,
                            },
                        },
                    ],
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    start: true,
                    end: true,
                    allDay: true,
                    author: false,
                    role: true,
                },
            });
        } else {
            events = await prisma_db.event.findMany({
                where: {
                    author: { id: userId },
                    role: role,
                    AND: [
                        {
                            start: {
                                lte: currViewEnd,
                            },
                        },
                        {
                            end: {
                                gte: currViewStart,
                            },
                        },
                    ],
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    start: true,
                    end: true,
                    allDay: true,
                    author: false,
                    role: true,
                },
            });
        }

        const eventList = toEventList(events);

        return eventList;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while getting the events.");
    }
};

export const createEvent = cache(async (data: any) => {
    const { isAdmin: adminStatus, user } = await isAdmin();
    try {
        if (adminStatus) {
            const newEvent = await prisma_db.event.create({
                data: {
                    ...data,
                    author: {
                        connectOrCreate: {
                            where: { email: user?.email },
                            create: {
                                email: user?.email,
                                name: user?.name,
                                id: user?.id,
                            },
                        },
                    },
                },
            });

            return newEvent;
        } else {
            throw new Error("User is not authorized to create events.");
        }
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while creating the event.");
    }
});

export const deleteEvent = async (id: string) => {

    const { isAdmin: adminStatus, user } = await isAdmin();

    try {

        if (adminStatus) {
            return await prisma_db.event.delete({ where: { id: id } });
        }

        else {
            const event = await prisma_db.event.delete({
                where: { id: id },
                select: { author: { select: { id: true } } },
            });

            if (event?.author.id === user?.id) {
                return await prisma_db.event.delete({ where: { id: id } });
            } else {
                throw new Error("User is not authorized to delete this event.");
            }
        }

    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while deleting the event.");
    }
};

export const updateEvent = async (id: string, data: any) => {
    const { isAdmin: adminStatus, user } = await isAdmin();
    try {
        if (adminStatus) {
            return await prisma_db.event.update({
                where: { id },
                data: {
                    ...data,
                    author: {
                        connectOrCreate: {
                            where: { email: user?.email },
                            create: {
                                email: user?.email,
                                name: user?.name,
                                id: user?.id,
                            },
                        },
                    },
                },
            });
        } else {
            throw new Error("User is not authorized to update events.");
        }
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while updating the event.");
    }
};