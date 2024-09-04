import { Building2, Files, Home, Settings, Users } from "lucide-react";

export const menu_entries = [
  {
    value: "dashboard",
    label: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    value: "accounts",
    label: "Accounts",
    href: "/portal/accounts",
    icon: Building2,
  },
  {
    value: "files",
    label: "Files",
    href: "/portal/files",
    icon: Files,
  },
  {
    value: "users",
    label: "Users",
    href: "/portal/users",
    icon: Users,
  },
  {
    value: "settings",
    label: "Settings",
    href: "/portal/settings",
    icon: Settings,
  },
];
