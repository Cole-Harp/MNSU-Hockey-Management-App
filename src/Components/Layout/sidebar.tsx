"use client"

import { cn } from "../../lib/utils";
import { CalendarDays, Home, MessageSquare, User2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";


export const Sidebar = () => {
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
        },
        {
            icon: User2,
            href: "/Profile",
            label: "Profile"
        }
    ]

    useEffect(() => {
        // Prefetch the "Messages" and "Schedule" routes
        router.prefetch('/Messaging');
        router.prefetch('/Schedule');
    }, [router]);

    const onNavigate = (url: string) => {

        return router.push(url)
    }

    return (
        <div className="space-y-4 flex flex-col h-full text-primary bg-mnsu_purple">

            <div className="p-3 flex flex-1 justify-center">
                <div className="space-y-2">
                    {routes.map((route) => (
                        <button
                            type = 'submit'
                            onClick={() => onNavigate(route.href)}
                            key={route.href}
                            className={cn("text-muted-foreground text-xs text-mnsu_gold group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-black/10 rounded-lg transition",
                                pathName === route.href && "text-mnsu_gold"
                            )}
                        >
                            <div className="flex flex-col gap-y-2 items-center flex-1">
                                <route.icon className="h-5 w-5" />
                                {route.label}
                            </div>
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
}
