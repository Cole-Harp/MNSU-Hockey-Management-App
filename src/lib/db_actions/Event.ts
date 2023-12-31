"use server";

import prisma_db from "../../../prisma/db";
import { getAdmin, getAllUsers, getUser, isAdmin } from './Auth';
import { Event, UserRole } from "@prisma/client";
import { pusher } from "../socket/pusher";

export const userGetEvents = async (): Promise<Event[]> => {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error('Failed to get user info');
    }
    const events: Event[] = await prisma_db.event.findMany({
      where: {
        OR: [
          { authorId: user.id },
          { role: user.role, announcement: true },
        ],
      },
    });
    return events;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get events');
  }              
};

export const adminGetEvents = async (
  authorIds?: string[],
  roles?: UserRole[],
): Promise<Event[]> => {
  const { isAdmin: adminStatus, user } = await getAdmin();
  
  try {
    if (!Array.isArray(authorIds) || !user) {
      return [];
    }

    if (authorIds.some(value => value === 'all')) {
      const users = await getAllUsers();
      const userIds = users.map(user => user.id);
      authorIds = authorIds.concat(userIds);
    }
    
    if (authorIds.some(value => value === 'me')) {
      authorIds = authorIds.concat(user.id);
    }

    if (adminStatus) {
      let whereClause: { authorId?: { in: string[] }; role?: { in: UserRole[] } } = {};

      if (authorIds && authorIds.length > 0) {
        whereClause.authorId = {
          in: authorIds,
        };
      }

      if (roles && roles.length > 0) {
        whereClause.role = {
          in: roles,
        };
      }

      return await prisma_db.event.findMany({
        where: whereClause,
      });
    }

    return [];
    
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const createEvent = async (data: any) => {
  const user = await getUser();

  try {
    const newEvent = await prisma_db.event.create({
      data: {
        ...data,
        daysOfWeek: data.daysOfWeek ? data.daysOfWeek : '',
        authorId: user?.id
      },
    });

  if (data.announcement) {
    pusher.trigger('announcements', `new-${data.role}`, newEvent);
  }
    return newEvent;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while creating the event.");
  }
};

export const deleteEvent = async (id: string) => {
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
};

export const updateEvent = async (id: string, data: any) => {
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
      } catch (error) {
        //TODO ADD TOASTS
        console.error(error);
        throw new Error("User is not authorized to update this event.");
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while updating the event.");
  }
};