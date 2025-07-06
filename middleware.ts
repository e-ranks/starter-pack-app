import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/auth/login", "/auth/register"];

const ROLE_ACCESS: Record<string, string[]> = {
    admin: ["/dashboard", "/users", "/admin", "/auth/login", '/forbidden', '/not-found'],
    operator: ["/dashboard", "/operator"],
    guest: ["/dashboard"],
}

const AVAILABLE_MENUS = [
    '/dashboard',
    '/test',
    '/auth/login',
    '/forbidden',
    '/not-found'
]

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const isAuthenticated = !!token;
    const pathname = req.nextUrl.pathname
    const isPublicPath = PUBLIC_PATHS.includes(req.nextUrl.pathname);

    if (!isAuthenticated && !isPublicPath) return NextResponse.redirect(new URL("/auth/login", req.url));

    if (isAuthenticated && req.nextUrl.pathname === "/") {
        const rawPath = token?.defaultPath || '/'
        const defaultPath = "/" + rawPath.replace(/^\/+/, "")
        return NextResponse.redirect(new URL(defaultPath, req.url));
    }

    if (isAuthenticated) {
        const role = token?.role
        const allowedPaths = ROLE_ACCESS[role as string] || []

        const isValidMenu = AVAILABLE_MENUS.some(menu => pathname.startsWith(menu))
        if (!isValidMenu) return NextResponse.redirect(new URL('/not-found', req.url))

        const isAllowed = allowedPaths.some(path => pathname.startsWith(path))
        if (!isAllowed) return NextResponse.redirect(new URL('/forbidden', req.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
