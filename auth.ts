import NextAuth, { User } from "next-auth";
// import GoogleProvoder from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { isTargetAfterCurrent } from "./utilities/helper";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Partial<Record<"email" | "password", unknown>>
      ) {
        try {
          const result = await loginUseCase.execute({
            email: String(credentials?.email),
            password: String(credentials?.password),
          });
          return {
            email: credentials.email,
            accessToken: result?.token,
            refreshToken: result?.refreshToken,
            expiresAt: result?.expiresAt,
          } as User;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresAt = user?.expiresAt;
      }
      // console.log("---------jwt-----token-------", token);
      if (isTargetAfterCurrent(user?.expiresAt || token.expiresAt)) {
        return token;
      } else return null;
    },

    async session({ session, token }) {
      // console.log("----------session-----------", token);
      session.sessionToken = token?.accessToken as string;
      session.user.accessToken = token?.accessToken;
      session.user.refreshToken = token?.refreshToken;
      session.user.expiresAt = token?.expiresAt;
      session.user.email = token?.email;
      return session;
    },
  },
  pages: { signIn: "/login" },
});
