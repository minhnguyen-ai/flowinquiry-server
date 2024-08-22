import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import apiAuthSignIn from "@/lib/api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Partial<Record<"email" | "password", unknown>> | undefined,
      ) {
        if (!credentials) {
          throw new Error("Invalid credentials");
        }
        const user = await apiAuthSignIn(credentials);
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.accessToken = user?.accessToken;
        token.id = user.id;
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      return { ...session, token: token.accessToken, user: token.user };
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // Maximum session age in seconds (30 days)
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  debug: process.env.NODE_ENV !== "production",
});
