"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import {Session} from "next-auth";

export interface AuthProviderProps {
    children: React.ReactNode;
    session?: Session | null;
}
function Provider({ children, session }: Readonly<AuthProviderProps>) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Provider;