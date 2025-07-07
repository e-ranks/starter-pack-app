// components/layout-shell.tsx
'use client'

import { usePathname } from 'next/navigation'
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toogle"
import { NavUser } from "@/components/nav-user"

const data = {
    user: {
        name: "Doomes",
        email: "doomes@gmail.com",
        avatar: "/avatars/shadcn.jpg",
    },
}

export function LayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAuthPage = pathname.startsWith('/auth')

    if (isAuthPage) {
        return <>{children}</>
    }

    return (
        <>
            <AppSidebar />
            <SidebarInset>
                <div className="flex items-center justify-between w-full px-4  mb-3">
                    <SidebarTrigger />
                    <div className="flex items-center gap-2">
                        <ModeToggle />
                        <NavUser user={data.user} />
                    </div>
                </div>
                {children}
            </SidebarInset>
        </>
    )
}
