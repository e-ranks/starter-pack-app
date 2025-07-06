export interface IUser {
    name: string
    role: string
    email: string
    image?: string
    password: string
    isActive?: boolean
    defaultPath?: string
    allowedPaths?: string[]
}