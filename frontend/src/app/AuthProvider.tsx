"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

export interface AuthProviderProps {
  children: React.ReactNode;
  session?: Session | null;
}
function Provider({ children, session }: Readonly<AuthProviderProps>) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Provider;
