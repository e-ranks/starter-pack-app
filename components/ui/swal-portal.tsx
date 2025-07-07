'use client'

import * as AlertDialog from "@radix-ui/react-alert-dialog"
import { createPortal } from "react-dom"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Check, LucideIcon, X } from "lucide-react"
type Props = {
    title: string
    description: string
    onClose: () => void
    onClick?: () => void
    theme?: 'light' | 'dark'
    icon?: 'success' | 'warning' | 'info' | 'error'
}

export default function SwalPortal({ title, description, theme = 'light', onClose, onClick, icon }: Props) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    const iconMap: Record<string, React.ElementType> = {
        success: Check,
        error: X,
        info: AlertTriangle,
        warning: AlertTriangle
    }
    const IconComponent = icon ? iconMap[icon] : null

    const content = (
        <AlertDialog.Root open onOpenChange={() => onClose()}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-black/40 fixed inset-0 z-50" />
                <AlertDialog.Content
                    className={`
            fixed z-50 left-1/2 top-1/2 max-w-md w-[90vw] bg-card -translate-x-1/2 -translate-y-1/2 border
            rounded-sm p-6 shadow-xl
          `}
                >
                    <AlertDialog.Title className="text-lg font-semibold flex items-center gap-3">
                        {title}
                        <div className="h-7 w-7 text-red-500 flex items-center justify-center">
                            {IconComponent && <IconComponent className="size-6" />}
                        </div>
                    </AlertDialog.Title>
                    <AlertDialog.Description className="mt-3 text-sm">{description}</AlertDialog.Description>
                    <div className="mt-6 flex items-center justify-end gap-2">
                        {onClose && <AlertDialog.Cancel asChild>
                            <Button onClick={() => onClose()}>Cancel</Button>
                        </AlertDialog.Cancel>}
                        {onClick && <AlertDialog.Action asChild>
                            <Button onClick={() => onClick?.()}>OK</Button>
                        </AlertDialog.Action>}
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )

    return mounted ? createPortal(content, document.body) : null
}
