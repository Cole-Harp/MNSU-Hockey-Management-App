'use client'

import { useUser } from "@clerk/nextjs"
import Link from "next/link"

const UserProfile = () => {    

    const currentUser = useUser()
    if(currentUser === undefined || currentUser === null){
        throw new Error('UserProfile: Cannot find user')
    }
    


    return (
        <div className = 'px-10'>
        <div>
            Your Profile
        </div>
        <div>User ID: {currentUser?.user?.id}</div>
        <div>User Name: {currentUser?.user?.fullName}</div>
        <div>User Email: {currentUser?.user?.emailAddresses[0].toString()}</div>
        <Link className = 'text-center' href="/Profile/ViewName">
            Edit Profile
          </Link>

        </div>
    )
    
}

export default UserProfile