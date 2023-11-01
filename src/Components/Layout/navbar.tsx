'use client'

import Link from 'next/link'
import { Poppins } from "next/font/google"
import { CalendarDays, Home, LayoutDashboard, MessageSquare } from "lucide-react";
import { UserButton, useOrganization } from '@clerk/nextjs'

const font = Poppins({
    weight: "600",
    subsets: ["latin"]
})

import { cn } from "../../lib/utils"
import { MobileSidebar } from './mobile-sidebar'
import { usePathname, useRouter } from 'next/navigation'

export const Navbar = () => {

    const pathName = usePathname();
    const router = useRouter();
    const currentOrganization = useOrganization()
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
        <div className="fixed w-full z-50 flex justify-between items-center py-2 h-16 bg-mnsu_purple">
            <div className="flex items-center pl-1">
                <MobileSidebar />
                <Link href="/">
                    <h1 className={cn("pl-3 hidden md:block text-xl md:text-3xl font-bold text-mnsu_gold",
                    font.className
                    )}>
                        {currentOrganization?.organization?.name}
                    </h1>
                </Link>
            </div>
            <div className="hidden md:flex">
                    {routes.map((route) => (
                        <div
                            onClick={() => onNavigate(route.href)}
                            key={route.href}
                            className={cn("flex text-muted-foreground text-xs text-mnsu_gold group p-3 w-full justify-start font-medium cursor-pointer hover:bg-black/10 rounded-lg transition",
                                pathName === route.href && "text-mnsu_gold"
                            )}
                        >
                            <div className="flex flex-col px-10 items-center">
                                <route.icon className="h-5 w-5" />
                                {route.label}

                            </div>
                        </div>

                    ))}
                </div>
            <div className="flex items-center gap-x-3 pr-3">
                <UserButton/>
            </div>
        </div>
    )
}