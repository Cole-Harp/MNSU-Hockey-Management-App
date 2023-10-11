"use server"

import { auth } from "@clerk/nextjs";
import prisma_db from "../../../prisma/db";
import { UserRole } from "@prisma/client";
import { cache } from "react"; // Cache to reduce query, Should also be changed to a Context Hook

export const getOrCreateUser = async () => {

  const { userId }: { userId: string | null } = auth();
  console.log(userId);

  if (userId === null) {
    throw new Error("Something went wrong authenticating");
  }

  const existingUser = await prisma_db.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (existingUser) {
    return existingUser;
  } else try {
    const user = auth().user
    const userEmail = user?.primaryEmailAddressId ?? Math.random.toString();
    const userName = user?.lastName;
    const newUser = await prisma_db.user.create({
      data: {
        id: userId,
        email: userEmail,
        name: userName,
        role: UserRole.Player,
      },
    });
    return newUser;
  }catch (error) {
    throw new Error();
  }
}

export const getAllUsers = async () => {
  const users = await prisma_db.user.findMany();
  return users;
};


export const getAdmin = cache(async () => {
    const { userId }: { userId: string | null } = auth();
    console.log(userId);
  
    if (userId === null) {
      return { isAdmin: false, user: undefined };
    }
  
    const clerkId = userId;
  
    try {
      const user = await prisma_db.user.findUnique({
        where: {
          id: clerkId,
        },
      });
  
      return user?.role === UserRole.Admin ? { isAdmin: true, user: user } : { isAdmin: false, user: user };
      
    } catch (error) {
      throw new Error("Something went wrong authenticating");
    }
  });

  

  export const isAdmin = cache(async () => {
    const { userId }: { userId: string | null } = auth();
    console.log(userId);
  
    if (userId === null) {
      return false;
    }
  
    const clerkId = userId;
  
    try {
      const user = await prisma_db.user.findUnique({
        where: {
          id: clerkId,
        },
      });
  
      return user?.role === UserRole.Admin ? true : false;
      
    } catch (error) {
      throw new Error("Something went wrong authenticating");
    }
  });