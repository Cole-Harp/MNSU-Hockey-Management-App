'use client'

import { useOrganization, useUser } from "@clerk/nextjs";
import { checkUser, createPrismaUser } from "@/lib/db_actions/Auth" 
import { UserRole } from "@prisma/client";



const WelcomePage = () => {    

    const user = useUser().user
    const { organization } = useOrganization()
    let currentOrg = 0
    

    for(let i = 0; i < user?.organizationMemberships.length; i++){
       if(user?.organizationMemberships[i].organization.id.toString() === organization!.id.toString()) {
        currentOrg = i;
    }
    }

    const currentRole = user?.organizationMemberships[currentOrg].publicMetadata.prismaRole.toString() as UserRole
    const exists = checkUser(currentRole)

    return (
        <div>
            Shalom New Feller!
            <div>
                {user?.fullName}
            </div>
            <div>
                {user?.organizationMemberships[currentOrg].publicMetadata.prismaRole.toString()}
            </div>   
        </div>
    );
    
}

export default WelcomePage


