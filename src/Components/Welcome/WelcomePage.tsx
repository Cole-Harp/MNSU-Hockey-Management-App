'use client'

import { useOrganization, useUser } from "@clerk/nextjs";
import { checkUser, createPrismaUser } from "@/lib/db_actions/Auth" 
import { UserRole } from "@prisma/client";



const WelcomePage = () => {    

    const user = useUser().user
    const { organization } = useOrganization()
    if(organization === null || organization === undefined)
    {
        return(
            <div>
            Shalom New Feller!
            <div>
                {user?.fullName}
            </div>
            </div>
        )
    }
    let currentOrg = 0
    
    if(user?.organizationMemberships.length  != null && user?.organizationMemberships.length != undefined && user?.organizationMemberships.length > 0)
    {
        for(let i = 0; i < user?.organizationMemberships.length; i++){
            if(user?.organizationMemberships[i].organization.id.toString() === organization!.id.toString()) {
             currentOrg = i;
         }
         }
    }
    

    const currentUserRole = user?.organizationMemberships[currentOrg].publicMetadata.prismaRole
    if(currentUserRole === null || currentUserRole === undefined){
        const defaultRole = 'Player' as UserRole
        const existsNoData = checkUser(defaultRole)
    }
    else{
    const exists = checkUser(currentUserRole.toString() as UserRole)
    }
    console.log(currentUserRole)
    return (
        <div>
            Hello There!
            <div>
                Name: {user?.fullName}
            </div>
            <div>
                Role: {user?.organizationMemberships[currentOrg].publicMetadata.prismaRole}
            </div>   
        </div>
    );
    
}

export default WelcomePage