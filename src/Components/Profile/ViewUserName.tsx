'use client'

import { useUser } from "@clerk/nextjs"
import Link from "next/link"


const ViewUserName = () => {    

    const currentUser = useUser()
    if(currentUser === undefined || currentUser === null){
        throw new Error('UserProfile: Cannot find user')
    }
    


    return (
        <div className = 'px-10'>
        <div>Your Name: {currentUser?.user?.firstName}</div>
        <div className = 'bg-blue-400 w-20 h-8 rounded'>
        <Link className = 'text-center' href="/Profile/ViewName/EditName">
            Edit Name
        </Link>
        </div>
        </div>
    )
    
}

export default ViewUserName