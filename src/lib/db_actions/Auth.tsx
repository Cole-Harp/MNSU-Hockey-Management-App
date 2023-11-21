"use server";

import { auth, currentUser, clerkClient } from "@clerk/nextjs";
import prisma_db from "../../../prisma/db";
import { UserRole, User } from "@prisma/client";
import { cache } from "react"; // Cache to reduce query, Should also be changed to a Context Hook




export const getAllUsers = async () => {
  const users = await prisma_db.user.findMany();
  return users;
};


export const getUser = async () => {
  const user = await currentUser();

  

  if (!user?.id) {
    throw new Error("Something went wrong authenticating");
  }

  const existingUser = await prisma_db.user.findFirst({
    where: {
      id: user?.id,
    },
  });
  return existingUser;
}




export const createUser = async () => {
  
}

export const updateUser = async (data: User) => {
  const { id, ...rest } = data;
  return prisma_db.user.update({
    where: { id },
    data: rest,
  });
}


export const getAdmin = async () => {
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
  };

  

  export const isAdmin = async () => {
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

  };


