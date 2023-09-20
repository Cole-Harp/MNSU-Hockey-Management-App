import Link from 'next/link'
import { Poppins } from "next/font/google"

const font = Poppins({
    weight: "600",
    subsets: ["latin"]
})

import { Sparkles } from "lucide-react"
import { cn } from "../../lib/utils"
// import { UserButton } from "@clerk/nextjs"
import { MobileSidebar } from './mobile-sidebar'

export const Navbar = () => {
    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-2 h-16 bg-purple-500">
            <div className="flex items-center pl-1">
                <MobileSidebar/>
                <Link href="/">
                    <h1 className={cn("pl-3 hidden md:block text-xl md:text-3xl font-bold text-white",
                    font.className
                    )}>
                        MNSU Hockey
                    </h1>
                </Link>
            </div>
            <div className="flex items-center gap-x-3 pr-2">
                {/* <UserButton /> */} Profile
            </div>
        </div>
    )
}