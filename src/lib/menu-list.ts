import {
  BookLock,
  Building2,
  Castle,
  LayoutGrid,
  LucideIcon,
  Users,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/portal",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/portal/accounts",
          label: "Accounts",
          icon: Building2,
        },
        {
          href: "/portal/teams",
          label: "Teams",
          icon: Castle,
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/portal/users",
          label: "Users",
          icon: Users,
        },
        {
          href: "/portal/settings/authorities",
          label: "Authorities",
          icon: BookLock,
        },
      ],
    },
  ];
}
