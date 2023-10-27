'use client'

import Link from 'next/link'
import { Poppins } from "next/font/google"
import { CalendarDays, Home, LayoutDashboard, MessageSquare } from "lucide-react";
import { UserButton } from '@clerk/nextjs'

const font = Poppins({
    weight: "600",
    subsets: ["latin"]
})

import { cn } from "../../lib/utils"
import { MobileSidebar } from './mobile-sidebar'
import { usePathname, useRouter } from 'next/navigation'

export const MobileNavbar = () => {

    const pathName = usePathname();
    const router = useRouter();
    const routes = [
        {
            icon: Home,
            href: "/",
            label: "Home",
        },
        {
            icon: MessageSquare,
            href: "/Messaging",
            label: "Messages",
        }, {
            icon: CalendarDays,
            href: "/Schedule",
            label: "Schedule",
        }
        
    ]

    const onNavigate = (url: string) => {

        return router.push(url)
    }

    
    return (
        <div className="sm:flex-col sticky bottom-0 w-full rounded bg-mnsu_purple md:hidden">
            <div className="flex justify-between">
                    {routes.map((route) => (
                        <div
                            onClick={() => onNavigate(route.href)}
                            key={route.href}
                            className={cn("text-muted-foreground text-xs text-mnsu_gold w-1/4 justify-center flex p-3 font-medium transition",
                                pathName === route.href && "text-mnsu_gold"
                            )}
                        >
                            <div className="flex flex-col items-center">
                                <route.icon className="h-5 w-5" />
                                {route.label}

                            </div>


                        </div>

                    ))}
                    <MobileSidebar/>
                </div>
                
        </div>
    )
}