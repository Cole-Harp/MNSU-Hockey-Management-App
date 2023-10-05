"use server";

import prisma_db from "../../../prisma/db";
import { cache } from 'react';
import { getOrCreateUser, isAdmin } from './Auth';
import { Event, UserRole } from "@prisma/client";

export const userGetEvents = cache(async (start: string, end: string): Promise<Event[]> => {
    try {
        const user = await getOrCreateUser();
        const events : any[] = await prisma_db.event.findMany({
          where: {
              authorId: user.id ,
              AND: [
                {
                  OR: [
                    {
                      start: {
                        gte: new Date(start).toISOString(),

                      },
                    },
                    {
                      end: {

                        lte: new Date(end).toISOString(),
                      },
                    },
                  ],
                },
              ],
            },
          });
        return events;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to get events');
      }
});

export const adminGetEvents = cache(async (start: string, end: string, authorId?: string, role?: UserRole): Promise<Event[]> => {
  try {
    const events: any[] = await prisma_db.event.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                start: {
                  gte: new Date(start).toISOString(),
                },
              },
              {
                end: {
                  lte: new Date(end).toISOString(),
                },
              },
            ],
          },
          authorId ? { authorId: authorId } : {},
          role ? { author: { role } } : {},
        ],
      },
    });
    console.log(events, authorId);
    return events;
  } catch (error) {
    console.error(error);
    throw Error();
  }
});


export const createEvent = cache(async (data: any) => {
  const { isAdmin: adminStatus, user } = await isAdmin();
  try {
    if (adminStatus) {
      const newEvent = await prisma_db.event.create({
        data: {
          ...data,
          authorId: user?.id
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

export const deleteEvent = cache(async (id: string) => {
  const { isAdmin: adminStatus, user } = await isAdmin();
  try {
    if (adminStatus) {
      return await prisma_db.event.delete({ where: { id: id } });
    } else {
      const event = await prisma_db.event.delete({
        where: { id: id },
      });

      if (event?.authorId === user?.id) {
        return await prisma_db.event.delete({ where: { id: id } });
      } else {
        throw new Error("User is not authorized to delete this event.");
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while deleting the event.");
  }
});

export const updateEvent = cache(async (id: string, data: any) => {
  const { isAdmin: adminStatus, user } = await isAdmin();
  try {
    if (adminStatus) {
      return await prisma_db.event.update({
        where: { id },
        data: {
          ...data,
        },
      });
    } else {
      throw new Error("User is not authorized to update events.");
    }
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while updating the event.");
  }
});