"use server";

import { auth, currentUser, useOrganization, useUser } from "@clerk/nextjs";
import prisma_db from "../../../prisma/db";
import { UserRole, User } from "@prisma/client";
import axios from "axios";


export const getAllUsers = async () => {
  const users = await prisma_db.user.findMany();
  return users;
};


export const getUser = async () => {
  const user = await currentUser();

 
  if (!user?.id) {
    throw new Error("Something went wrong authenticating");
  }

  console.log(user.id)
  
  axios.get('https://api.chatengine.io/users/me/', {
  headers: {
    "Project-ID": '61d8e5a6-da3c-403e-890f-3bb98e49b617',
    "User-Name": user.firstName, 
    "User-Secret": user.id,
  },
})
.catch(e => {
  console.log("GET request failed, attempting POST");

  axios.post(
    'https://api.chatengine.io/users/',
    {
      "username": user.firstName,
      "secret": user.id,
    },
    {
      headers: { "Private-Key": "4218d505-f3b6-4fed-8b5d-ef557be1c009" }
    }
  )
  .catch(e => console.log('POST request failed:', e.response));
});

  const existingUser = await prisma_db.user.findFirst({
    where: {
      id: user?.id,
    },
  });


  return(
    existingUser
  ) //Not sure why theres 2 returns
  return existingUser;
}


export const checkUser = async (metaData:UserRole) => {
  
  const user = await currentUser()
  console.log('current user in checkUser: ' + JSON.stringify(user))
  
  
  if(user?.id === null)
  { 
    throw new Error('Auth.tsx - checkUser: Invalid Id')
  }


  const checkPrismaUser = await prisma_db.user.upsert({
    where: {
      id: user?.id
  },
  update: {
        email: user?.emailAddresses[0].emailAddress,
        name: user?.firstName + ' ' + user?.lastName, 
        role: metaData
  },
  create: {
        id: user!.id,
        email: user?.emailAddresses[0].emailAddress,
        name: user?.firstName + ' ' + user?.lastName,
        role: metaData
  }})
  
}


export const createPrismaUser = async (user: any) => {

    const newPrismaUser = await prisma_db.user.create({
      data: {
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName
      }
    })
  
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


