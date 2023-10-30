'use client'

import CreateOrganization from "@/Components/Admin/CreateOrganization";
import InviteUser from "@/Components/Admin/InviteUser";
import OrganizationList from "@/Components/Admin/OrganizationList";
import WelcomePage from "@/Components/Welcome/WelcomePage";
import { ClerkLoaded, OrganizationProfile, useOrganizationList } from "@clerk/nextjs";



export default async function Page() {

    
  
    return (
      <div>
        <ClerkLoaded>
          <WelcomePage />
        </ClerkLoaded>
      </div>
    );
  }