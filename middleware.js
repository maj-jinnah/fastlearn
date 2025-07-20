
import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { LOGIN, PUBLIC_ROUTES, ROOT } from "./lib/routes"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req;
    const isAuthenticated = req.auth;

    const isPublicRoutes = (PUBLIC_ROUTES.find((route) => {
        return nextUrl.pathname.startsWith(route);
    }) || nextUrl.pathname === ROOT);

    if (!isAuthenticated && !isPublicRoutes) {
        // If the user is not authenticated and trying to access a protected route, redirect to login
        return Response.redirect(new URL(LOGIN, nextUrl));
    }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}