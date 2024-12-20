import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: { signIn: "/login" },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user;
      const isLoggedIn = !!user;
      const isOnLoginPage = nextUrl.pathname.startsWith("/login");

      const isDashboardPage = nextUrl?.pathname.startsWith("/dashboard");

      if (isDashboardPage && user?.role !== "ADMIN") {
        return Response.redirect(new URL("/", nextUrl));
      } else if (isLoggedIn && isOnLoginPage) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
