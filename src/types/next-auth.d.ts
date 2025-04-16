// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string;
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken: string;
    user: User;
  }
}
