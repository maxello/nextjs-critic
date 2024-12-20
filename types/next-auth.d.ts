import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: User | AdapterUser
  }
  interface User {
    role: string | undefined | null
  }
}