import { Building2, Files, Home, Settings, Users } from "lucide-react";

export const menu_entries = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
    variant: "default" as const,
  },
  {
    title: "Accounts",
    href: "/portal/accounts",
    icon: Building2,
    variant: "ghost" as const,
  },
  {
    title: "Files",
    href: "/portal/files",
    icon: Files,
    variant: "ghost" as const,
  },
  {
    title: "Users",
    href: "/portal/users",
    icon: Users,
    variant: "ghost" as const,
  },
  {
    title: "Settings",
    href: "/portal/settings",
    icon: Settings,
    variant: "ghost" as const,
  },
];
