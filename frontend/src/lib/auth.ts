import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import apiAuthSignIn from "./api";

export const authOptions:NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text"},
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Record<"email" | "username" | "password", string> | undefined) {
                if (!credentials) {
                    throw new Error("Invalid credentials");
                }
                const user = await apiAuthSignIn(credentials);
                console.log("API sign in: " + JSON.stringify(user));
                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            // Persist the OAuth access_token to the token right after signin
            console.log(`Token: ${JSON.stringify(token)}, account ${JSON.stringify(account)}, user ${JSON.stringify(user)}`);
            if (user) {
                token.accessToken = user?.accessToken;
                token.id = user.id;
            }
            console.log(`Return token ${JSON.stringify(token)}`)
            return token;
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            console.log(`Callback session! Token: ${JSON.stringify(token)}, session ${JSON.stringify(session)}, user ${JSON.stringify(user)}`);
            return session;
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // Maximum session age in seconds (30 days)
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET as string,
};
/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);