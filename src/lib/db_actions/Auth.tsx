"use server"

import { auth } from "@clerk/nextjs";
import prisma_db from "../../../prisma/db";
import { User_role } from "@prisma/client";
import { cache } from "react"; // Cache to reduce query, Should also be changed to a Context Hook

export const getOrCreateUser = async () => {

  const { userId }: { userId: string | null } = auth();
  console.log(userId);

  if (userId === null) {
    throw new Error("Something went wrong authenticating");
  }

  const existingUser = await prisma_db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (existingUser) {
    return existingUser;
  } else {
    const user = auth().user
    const userEmail = user?.emailAddresses[0].toString() ?? "";
    const userName = user?.lastName ?? "";
    const newUser = await prisma_db.user.create({
      data: {
        id: userId,
        email: userEmail,
        name: userName,
        role: User_role.Player,
      },
    });
    return newUser;
  }
}


export const isAdmin = cache(async () => {
    const { userId }: { userId: string | null } = auth();
    console.log(userId);
  
    if (userId === null) {
      return { isAdmin: true, user: undefined };
    }
  
    const clerkId = userId;
  
    try {
      const user = await prisma_db.user.findUnique({
        where: {
          id: clerkId,
        },
      });
  
      return user?.role === User_role.Admin ? { isAdmin: true, user: user } : { isAdmin: true, user: user };
      
    } catch (error) {
      throw new Error("Something went wrong authenticating");
    }
  });