'use client'

import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import getCurrentClerkUser from "./getCurrentClerkUser"
import { Pencil } from "lucide-react"
import Image from "next/image"

const UserProfile = () => {    

   


    return (
        <div className = 'flex flex-col h-full m-2 border-2 border-black rounded'>
            <div className = 'flex flex-row-3 mx-4 mt-4 w-full-4 h-20 items-center'>
                <div className = 'flex basis-1/4 w-full h-full justify-center items-center'>
                    <Image className = 'flex w-16 h-16 rounded-full' src = 'https://static-00.iconduck.com/assets.00/slightly-smiling-face-emoji-2048x1974-5msgqz9c.png' alt="missing"/>

                </div>
                <div className = 'flex basis-1/2 w-full h-full items-center text-lg'>
                    Your Name
                </div>
                <div className = 'flex flex-col basis-1/4 w-full h-full text-center items-center justify-center text-sm'>
                    <Pencil />
                    <Link href = '/Profile/ViewName'>
                        Edit Profile
                    </Link>
                </div>
            </div>
            
        <div className = 'flex flex-col mx-4 w-full-4 h-20 '>
            <div className = 'flex basis-1/8  w-full px-2 border-b-2 border-black font-bold'>
                Email Address
            </div>
            <div className = 'flex h-full text-center px-4 items-center font-medium'> 
                PlaceholderEmail@Email.com 
            </div>
        </div>
        <div className = 'flex flex-col mx-4 w-full-4 h-20 '>
            <div className = 'flex basis-1/8  w-full px-2 border-b-2 border-black font-bold'>
                Phone Number
            </div>
            <div className = 'flex h-full text-center px-4 items-center font-medium'> 
                (123)-456-7890
            </div>
        </div>
        </div>
    )
    
}

export default UserProfile