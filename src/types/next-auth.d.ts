/* eslint-disable-next-line */
import NextAuth from "next-auth";

declare module "next-auth" {
  import { AuthorityType } from "@/types/users";

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    imageUrl?: string | null;
    accessToken?: string;
    firstName?: string;
    lastName?: string;
    authorities: Array<AuthorityType>;
  }

  export interface DefaultSession {
    user?: User;
    expires: ISODateString;
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     user?: User
//   }
// }
