import { auth } from "@clerk/nextjs";
import prisma_db from "../../../prisma/db";
import { UserRole } from "@prisma/client";
import { cache } from "react"; // Cache to reduce query, Should also be changed to a Context Hook

export const isAdmin = cache(async () => {
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
  
      if (user?.role == UserRole.Admin) {
        return { isAdmin: true, user: user };
      } else {
        return { isAdmin: false, user: user };
      }
    } catch (error) {
      throw new Error("User is not authorized to create events.");
    }
  });