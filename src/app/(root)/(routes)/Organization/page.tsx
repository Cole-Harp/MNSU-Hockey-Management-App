'use client'

import InvitationList from "@/Components/Organizations/InvitationList";
import MemberList from "@/Components/Organizations/MemberList";
import OrganizationList from "@/Components/Organizations/OrganizationList";
import { OrganizationSwitcher } from "@clerk/nextjs";

const Organization = () => {
    return (
      <div>
        <OrganizationList />
      </div>
    );
  };
  
  export default Organization;