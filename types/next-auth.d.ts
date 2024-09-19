// types/next-auth.d.ts
import NextAuth from "next-auth";
import { User as NextAuthUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    sessionToken: string;
    user: {
      email?: string;
      accessToken?: string;
      refreshToken?: string;
      expiresAt?: number;
    } & DefaultSession["user"];
  }

  interface User extends NextAuthUser {
    email?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
  }
}
