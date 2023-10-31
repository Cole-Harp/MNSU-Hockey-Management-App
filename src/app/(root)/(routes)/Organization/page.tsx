'use client'

import OrganizationList from "@/Components/Admin/OrganizationList";
import { OrganizationSwitcher } from "@clerk/nextjs";

const Organization = () => {
    return (
      <div>
        <OrganizationList />
        <OrganizationSwitcher />
      </div>
    );
  };
  
  export default Organization;