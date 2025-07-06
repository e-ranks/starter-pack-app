import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/auth/login", "/auth/register"];

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const isAuthenticated = !!token;
    const isPublicPath = PUBLIC_PATHS.includes(req.nextUrl.pathname);

    if (!isAuthenticated && !isPublicPath) return NextResponse.redirect(new URL("/auth/login", req.url));

    if (isAuthenticated && req.nextUrl.pathname === "/") {
        const rawPath = token?.defaultPath || "dashboard";
        const defaultPath = "/" + rawPath.replace(/^\/+/, "")

        return NextResponse.redirect(new URL(defaultPath, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
