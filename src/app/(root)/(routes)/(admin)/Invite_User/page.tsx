
import CreateOrganization from "@/Components/Admin/CreateOrganization";
import InviteUser from "@/Components/Admin/InviteUser";
import OrganizationList from "@/Components/Admin/OrganizationList";
import { useOrganizationList } from "@clerk/nextjs";



export default async function Page() {

    
  
    return (
      <div>
        <OrganizationList />
        <CreateOrganization />
        <InviteUser />
      </div>
    );
  }