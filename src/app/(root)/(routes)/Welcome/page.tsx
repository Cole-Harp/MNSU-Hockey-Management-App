'use client'

import CreateOrganization from "@/Components/Organizations/CreateOrganization";
import InviteUser from "@/Components/Organizations/InviteUser";
import OrganizationList from "@/Components/Organizations/OrganizationList";
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