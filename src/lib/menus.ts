import { Building2, Castle, Home, Settings, Users } from "lucide-react";

import { IconType } from "@/types/ui-components";

export type SubChildren = {
  href: string;
  label: string;
  active: boolean;
  children?: SubChildren[];
};

export type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: IconType;
  submenus?: Submenu[];
  children?: SubChildren[];
};

export type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: IconType;
  submenus: Submenu[];
  id: string;
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
  id: string;
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      id: "dashboard",
      menus: [
        {
          id: "dashboard",
          href: "/portal/dashboard",
          label: "dashboard",
          active: pathname.includes("/portal/dashboard"),
          icon: Home,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      id: "app",
      menus: [
        {
          id: "accounts",
          href: "/portal/accounts",
          label: "Accounts",
          active: pathname.includes("/portal/accounts"),
          icon: Building2,
          submenus: [],
        },
        // {
        //   id: "files",
        //   href: "/portal/files",
        //   label: "Files",
        //   active: pathname.includes("/portal/files"),
        //   icon: Files,
        //   submenus: [],
        // },
        {
          id: "teams",
          href: "/portal/teams",
          label: "Teams",
          active: pathname.includes("/portal/teams"),
          icon: Castle,
          submenus: [],
        },
        {
          id: "users",
          href: "/portal/users",
          label: "Users",
          active: pathname.includes("/portal/users"),
          icon: Users,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      id: "settings",
      menus: [
        {
          id: "auth",
          href: "/portal/settings",
          label: "Settings",
          active: pathname.includes("/portal/settings"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}

export function getHorizontalMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "dashboard",
      id: "dashboard",
      menus: [
        {
          id: "dashboard",
          href: "/",
          label: "dashboard",
          active: pathname.includes("/"),
          icon: Home,
          submenus: [],
        },
      ],
    },

    {
      groupLabel: "apps",
      id: "app",
      menus: [
        {
          id: "accounts",
          href: "/portal/accounts",
          label: "Accounts",
          active: pathname.includes("/portal/accounts"),
          icon: Building2,
          submenus: [],
        },
      ],
    },
  ];
}
