import { NextRequest, NextResponse } from "next/server"

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
type Handler = (req: NextRequest) => Promise<Response>

export const apiHandler = () => {
    const routes: Partial<Record<string, Handler>> = {}

    const handler = {
        handle: async (req: NextRequest): Promise<Response> => {
            const method = req.method as Method
            const routeHandler = routes[method]

            if (!routeHandler) return NextResponse.json({ message: `Method ${method} not allowed` }, { status: 405 })
            return routeHandler(req)
        },

        get: (fn: Handler) => {
            routes['GET'] = fn
            return handler
        },

        post: (fn: Handler) => {
            routes[`POST`] = fn
            return handler
        },

        patch: (fn: Handler) => {
            routes['PATCH'] = fn
            return handler
        },

        delete: (fn: Handler) => {
            routes['DELETE'] = fn
            return handler
        },

        put: (fn: Handler) => {
            routes['PUT'] = fn
            return handler
        },
    }

    return handler
}