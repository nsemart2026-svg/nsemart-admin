/* eslint-disable @typescript-eslint/no-unused-vars */
import { authOptions } from "@/lib/authOptions";
import NextAuth, { NextAuthOptions } from "next-auth";
// import { JWT } from "next-auth/jwt";
// import { Session } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         const res = await fetch(
//           `https://mega-mart-weld.vercel.app/api/v1/auth/login`,
//           {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               email: credentials?.email,
//               password: credentials?.password,
//             }),
//           }
//         );
//         if (!res.ok) return null;
//         const json = await res.json();
//         console.log(json.data);

//         if (!json?.data) return null;
//         return {
//           id: json.data._id,
//           name: json.data.name,
//           email: json.data.email,
//           role: json.data.role,
//           gender: json.data.gender,
//           walletPoint: json.data.walletPoint,
//         };
//       },
//     }),
//   ],

//   pages: {
//     signIn: '/auth/login',
//   },

//   session: {
//     strategy: 'jwt',
//     maxAge: 60 * 60 * 24, // 1 day
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//         token.role = user.role;
//         token.gender = user.gender;
//         token.walletPoint = user.walletPoint;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.name = token.name as string;
//         session.user.email = token.email as string;
//         session.user.role = token.role as string;
//         session.user.gender = token.gender as string;
//         session.user.walletPoint = token.walletPoint as number;
//       }
//       return session;
//     },
//   },
// };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
