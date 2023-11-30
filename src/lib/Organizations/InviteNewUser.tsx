'use server'

import { clerkClient } from "@clerk/nextjs/server"

 
export default async function InviteNewUser(email:string, orgId:string, userId:string, clerkRole:any, prismaRole:string) {
  
   
    const invite = await clerkClient.organizations.createOrganizationInvitation({
        emailAddress: email,
        organizationId: orgId,
        inviterUserId: userId,
        role: clerkRole,
        publicMetadata: {prismaRole},
    })
    return (
        invite
    )

}