import React from "react";

import { Menu } from "@/components/themes/sidebar/menu";

import SidebarContent from "./sidebar-content";

const AppSidebar = () => {
  return (
    <SidebarContent>
      <Menu />
    </SidebarContent>
  );
};

export default AppSidebar;
