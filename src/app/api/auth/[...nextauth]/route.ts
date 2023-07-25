import NextAuth from "next-auth/next";

import { authOptions } from "@/lib/auth";

/**
 * Initialize the NextAuth.js authentication handler with the provided options.
 * @type {import("next-auth").NextApiHandler}
 * @see {@link https://next-auth.js.org/getting-started/introduction}
 * @see {@link https://next-auth.js.org/configuration/options}
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
