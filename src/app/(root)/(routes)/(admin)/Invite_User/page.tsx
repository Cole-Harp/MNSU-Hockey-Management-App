
import CreateOrganization from "@/Components/Organizations/CreateOrganization";
import InviteUser from "@/Components/Organizations/InviteUser";
import OrganizationList from "@/Components/Organizations/OrganizationList";
import { ClerkLoaded } from "@clerk/nextjs";



export default async function Page() {

    
  
    return (
      <div>
        <ClerkLoaded>
          <OrganizationList />
          <CreateOrganization />
          <InviteUser />
        </ClerkLoaded>
      </div>
    );
  }