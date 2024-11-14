"use client";

import { useSession } from "next-auth/react";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { apiClient } from "@/lib/api-client";

type Permission = {
  resourceName: string;
  permission: string;
};

// Define the context type
interface PermissionsContextType {
  permissions: Permission[];
  setPermissions: (permissions: Permission[]) => void;
}

// Create the context with a default undefined value
const PermissionsContext = createContext<PermissionsContextType | undefined>(
  undefined,
);

// Custom hook to use permissions context
export const usePermissions = (): PermissionsContextType => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error("usePermissions must be used within a PermissionsProvider");
  }
  return context;
};

// Props for PermissionsProvider
interface PermissionsProviderProps {
  children: ReactNode;
}

// Fetch permissions from your API
const fetchPermissions = async (
  userId: number,
  authToken: string,
): Promise<Permission[]> => {
  const response = await apiClient(
    `/api/users/permissions/${userId}`,
    "GET",
    undefined,
    authToken,
  ); // Replace with your API endpoint
  const data = await response.json();
  return data.permissions;
};

// PermissionsProvider component
export const PermissionsProvider: React.FC<PermissionsProviderProps> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    // Fetch permissions only if the user is authenticated
    console.log("Permission " + status + " " + session?.user?.accessToken);
    if (status === "authenticated" && session) {
      fetchPermissions(Number(session?.user?.id), session?.user?.accessToken!)
        .then(setPermissions)
        .catch(console.error);
    }
  }, [status, session]);

  return (
    <PermissionsContext.Provider value={{ permissions, setPermissions }}>
      {children}
    </PermissionsContext.Provider>
  );
};
