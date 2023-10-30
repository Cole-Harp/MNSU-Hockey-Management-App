'use client'

import BackendUserInvite from "@/Components/Admin/BackendInvite";
import CreateOrganization from "@/Components/Admin/CreateOrganization";
import InviteUser from "@/Components/Admin/InviteUser";
import OrganizationList from "@/Components/Admin/OrganizationList";
import { ClerkLoaded, useOrganizationList } from "@clerk/nextjs";



export default async function Page() {

    
  
    return (
      <div>
        <ClerkLoaded>
            <BackendUserInvite />
        </ClerkLoaded>
       
      </div>
    );
  }