import { authOptions } from "./auth"
import { handlerFn } from "./handlerFn"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

const handlerAuthRole = (allowedRoles: string[], handler: handlerFn) => {
    return async (req: NextRequest): Promise<Response> => {
        const session = await getServerSession(authOptions)

        if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        if (!session.user.role || !allowedRoles.includes(session.user.role)) return NextResponse.json({ message: 'Forbidden' }, { status: 403 })

        return handler(req)
    }
}

export default handlerAuthRole