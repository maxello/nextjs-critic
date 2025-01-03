import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { UserProps } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

async function getUser(email: string) {
  try {
    const user = await sql<UserProps>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials: Partial<Record<string | number, unknown>>) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  pages: { signIn: "/login" },
    callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          role: user.role
        }
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
        },
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async authorized({ auth, request: { nextUrl } }) {
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
})