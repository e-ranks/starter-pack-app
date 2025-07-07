import { showSwal } from "@/utils/showSwal"

export const validatePayload = async (
    payload: Record<string, any>,
    validations: Record<string, string>,
    theme: 'light' | 'dark' = 'light',
    icon?: 'success' | 'warning' | 'info' | 'error',
    onClick?: () => void,
    optionalFields: string[] = [],
) => {
    for (const [key, value] of Object.entries(payload)) {
        if (!value && !optionalFields.includes(key)) {
            const validationMessage = validations[key]
            await showSwal({
                icon,
                theme,
                onClick,
                title: "Warning",
                description: validationMessage || "Field tidak boleh kosong",
            })
            return false
        }
    }
    return true
}
