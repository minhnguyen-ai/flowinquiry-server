"use client";

import { usePathname } from "next/navigation";
import React from "react";

import IconNav from "@/components/themes/sidebar/menu/icon-nav";
import SidebarNav from "@/components/themes/sidebar/menu/sidebar-nav";
import { getMenuList } from "@/lib/menus";

export function MenuTwoColumn() {
  // translate
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <>
      <IconNav menuList={menuList} />
      <SidebarNav menuList={menuList} />
    </>
  );
}
