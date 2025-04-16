// auth.ts or auth.config.ts
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { fetchUserProfile, login } from "./auth-services";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const token = await login(email, password);
        if (!token) throw new InvalidLoginError();
        const user = await fetchUserProfile(token);
        if (!user) throw new InvalidLoginError();
        return {
          ...user,
          accessToken: token,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.user = user as User;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: token.user,
        accessToken: token.accessToken,
      };
    },
  },
});
