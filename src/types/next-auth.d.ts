import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      gender: string;
      walletPoint: number;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    gender: string;
    walletPoint: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    gender: string;
    walletPoint: number;
  }
}
