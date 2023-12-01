'use server'

import CreateOrganization from "@/Components/Organizations/CreateOrganization";
import InvitationList from "@/Components/Organizations/InvitationList";
import InviteUser from "@/Components/Organizations/InviteUser";
import MemberList from "@/Components/Organizations/MemberList";
import OrganizationList from "@/Components/Organizations/OrganizationList";
import { ClerkLoaded } from "@clerk/nextjs";



export default async function Page() {

    
  
    return (
      <div>
        <ClerkLoaded>
          <OrganizationList />
          <CreateOrganization />
          <InviteUser />
          <InvitationList />
          <MemberList />
        </ClerkLoaded>
      </div>
    );
  }