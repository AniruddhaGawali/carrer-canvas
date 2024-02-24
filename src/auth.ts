import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import db from "@/db";
import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { encode, decode } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    Credentials({
      name: "credentials",

      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
      ) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error(
            "Missing email or password fields. Please try again.",
          );
        }

        const user = await db.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error(
            "No user found with this email address. Create a new account .",
          );
        }

        if (!user.hashedPassword) {
          throw new Error("Please login with Google or Github.");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!,
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password. Please try again.");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  secret: process.env.SECRET,

  session: {
    strategy: "jwt",
  },

  jwt: { encode, decode },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },

  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
function CredentialsProvider(arg0: {}): import("next-auth/providers/index").Provider {
  throw new Error("Function not implemented.");
}
