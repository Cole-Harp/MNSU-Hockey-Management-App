"use server";

import prisma_db from "../../../prisma/db";
import { cache } from 'react';
import { getAdmin, getOrCreateUser, isAdmin } from './Auth';
import { Event, UserRole } from "@prisma/client";

export const userGetEvents = cache(async (start: string, end: string): Promise<Event[]> => {
  try {
    const user = await getOrCreateUser();
    const events: Event[] = await prisma_db.event.findMany({
      where: {
        OR: [
          {
            AND: [
              { start: { gte: new Date(start) } },
              { end: { lte: new Date(end) } },
              { authorId: user.id },
              { role: user.role },
            ],
          },
          {
            AND: [
              { role: user.role },
              //TODO ADD { anouncment: true }, schema wont update

            ]
          }
        ]
      },
    });
    return events;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get events');
  }
});

export const adminGetEvents = async (
  start: string,
  end: string,
  authorId?: string,
  role?: UserRole,
): Promise<Event[]> => {
  const { isAdmin: adminStatus, user } = await getAdmin();
  try {
    if (authorId == "me") {
      authorId = user?.id;
    }
    if (adminStatus) {
      const events: Event[] = await prisma_db.event.findMany({
        where: {
          AND: [
            { start: { gte: new Date(start) } },
            { end: { lte: new Date(end) } },
            authorId ? { authorId } : {},
            role ? { author: { role } } : {},
          ],
        },
      });

      return events;
    }
    // Return an empty array if the user is not an admin
    return [];
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

export const createEvent = cache(async (data: any) => {
  const user = await getOrCreateUser();
  try {
    const newEvent = await prisma_db.event.create({
      data: {
        ...data,
        authorId: user?.id
      },
    });
    return newEvent;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while creating the event.");
  }
});

export const deleteEvent = cache(async (id: string) => {
  const { isAdmin: adminStatus, user } = await getAdmin();
  try {
    if (adminStatus) {
      return await prisma_db.event.delete({ where: { id: id } });
    }
    else {
      try {
        return await prisma_db.event.delete({
          where: {
            id: id,
            authorId: user?.id,
          }
        });
      } catch {
        //TODO ADD TOASTS
        throw new Error("User is not authorized to delete this event.");
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while deleting the event.");
  }
});

export const updateEvent = cache(async (id: string, data: any) => {
  const { isAdmin: adminStatus, user } = await getAdmin();
  try {
    if (adminStatus) {
      return await prisma_db.event.update({
        where: { id },
        data: {
          ...data,
        },
      });
    } else {
      try {
        return await prisma_db.event.update({
          where: {
            id: id,
            authorId: user?.id
          },
          data: {
            ...data,

          },
        });
      } catch {
        //TODO ADD TOASTS
        throw new Error("User is not authorized to update this event.");
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while updating the event.");
  }
});