'use client'

import InvitationList from "@/Components/Organizations/InvitationList";
import MemberList from "@/Components/Organizations/MemberList";
import OrganizationList from "@/Components/Organizations/OrganizationList";
import { ClerkLoaded, OrganizationSwitcher } from "@clerk/nextjs";


interface IParams { 
    organizationId: string
  }


const OrganizationPage = async ({ params }: { params: IParams }) => {
    
    
    
    return (
      <div>
        <ClerkLoaded>
          <MemberList />
        </ClerkLoaded>
        
      </div>
    );
  };
  
  export default OrganizationPage;