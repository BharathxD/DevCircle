import { env } from "@/env.mjs"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { nanoid } from "nanoid"
import { getServerSession } from "next-auth"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import database from "./database"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(database),
  secret: env["NEXTAUTH_SECRET"],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    GoogleProvider({
      clientId: env["GOOGLE_CLIENT_ID"],
      clientSecret: env["GOOGLE_CLIENT_SECRET"],
    }),
  ],
  callbacks: {
    session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.username = token.username
      }
      return session
    },
    async jwt({ token, user }) {
      const dbUser = await database.user.findFirst({
        where: {
          email: token.email,
        },
      })
      if (!dbUser) {
        token.id = user.id
        return token
      }
      if (!dbUser.username) {
        database.user.update({
          where: { id: dbUser.id },
          data: { username: nanoid(10) },
        })
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
      }
    },
    redirect() {
      return "/"
    },
  },
}

export const getAuthSession = () => getServerSession(authOptions)
