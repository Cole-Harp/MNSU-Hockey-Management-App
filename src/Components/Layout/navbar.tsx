import Link from 'next/link'
import { Poppins } from "next/font/google"
import { UserButton } from '@clerk/nextjs'

const font = Poppins({
    weight: "600",
    subsets: ["latin"]
})

import { cn } from "../../lib/utils"
import { MobileSidebar } from './mobile-sidebar'

export const Navbar = () => {
    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-2 h-16 bg-mnsu_purple">
            <div className="flex items-center pl-1">
                <MobileSidebar/>
                <Link href="/">
                    <h1 className={cn("pl-3 hidden md:block text-xl md:text-3xl font-bold text-mnsu_gold",
                    font.className
                    )}>
                        MNSU Hockey
                    </h1>
                </Link>
            </div>
            <div className="flex items-center gap-x-3 pr-3">
                <UserButton/>
            </div>
        </div>
    )
}