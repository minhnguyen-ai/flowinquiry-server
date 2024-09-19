declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    accessToken?: string;
    firstName?: string;
    lastName?: string;
  }

  interface Session {
    user: User;
    expires: ISODateString;
  }
}
