'Use client';
import { Menu } from "lucide-react"
import { Sheet,
        SheetContent,
        SheetTrigger} from "../ui/sheet"
import { Sidebar } from "./sidebar"
import React from "react";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const MobileSidebar = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden m-4">
                <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="p-0 bg-secondary pt-10 w-32">
            <form
            onSubmit={(event) => {
              wait().then(() => setOpen(false));
              event.preventDefault();
            }}
          >
                <Sidebar />
                </form>
            </SheetContent>
        </Sheet>
    )
}