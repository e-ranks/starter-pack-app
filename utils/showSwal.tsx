'use client'

import { createRoot } from "react-dom/client"
import SwalPortal from "@/components/ui/swal-portal"

export const showSwal = ({ title, description, theme = 'light', onClick, icon }: {
    title: string
    description: string
    onClick?: () => void
    theme?: 'light' | 'dark'
    icon?: 'error' | 'success' | 'warning' | 'info'
}) => {

    return new Promise<void>((resolve) => {
        const div = document.createElement('div')
        document.body.appendChild(div)

        const root = createRoot(div)

        const handleClose = () => {
            root.unmount()
            div.remove()
            resolve()
        }

        root.render(<SwalPortal
            icon={icon}
            theme={theme}
            title={title}
            onClick={onClick}
            cancel={handleClose}
            description={description}
        />)
    })
}
