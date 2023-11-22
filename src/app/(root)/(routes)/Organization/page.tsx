'use client'

import InvitationList from "@/Components/Organizations/InvitationList";
import MemberList from "@/Components/Organizations/MemberList";
import OrganizationList from "@/Components/Organizations/OrganizationList";
import { ClerkLoaded, OrganizationSwitcher } from "@clerk/nextjs";

const Organization = () => {
    return (
      <div>
        <ClerkLoaded>
          <OrganizationList />
        </ClerkLoaded>
        
      </div>
    );
  };
  
  export default Organization;