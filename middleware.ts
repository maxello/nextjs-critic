import NextAuth from "next-auth"
import { authConfig } from "@/app/auth.config"
export default NextAuth(authConfig).auth;
// const { auth } = NextAuth(authConfig)

// export default auth(({ nextUrl, auth }) => {
//   const user = auth?.user;
//   const isLoggedIn = !!user;
//   const isOnLoginPage = nextUrl.pathname.startsWith('/login');

//   const isDashboardPage = nextUrl?.pathname.startsWith("/dashboard")

//   if (isDashboardPage && !user?.roles?.includes("ADMIN")) {
//     return Response.redirect(new URL("/", nextUrl))
//   } else if (isLoggedIn && isOnLoginPage) {
//     return Response.redirect(new URL('/', nextUrl));
//   }

//   return null
// })

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// }

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
