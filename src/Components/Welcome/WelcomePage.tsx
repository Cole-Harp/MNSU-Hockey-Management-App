'use client'

import { useUser } from "@clerk/nextjs";
import { checkUser, createPrismaUser } from "@/lib/db_actions/Auth" 

const WelcomePage = () => {    

    const user = useUser().user
    const exists = checkUser()
   

    return (
        <div>
            Shalom New Feller!
            <div>
                {user?.fullName}
            </div>
        </div>
    );
    
}

export default WelcomePage