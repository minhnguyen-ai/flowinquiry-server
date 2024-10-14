import React from "react";

import HeaderContent from "@/components/themes/header/header-content";
import HeaderLogo from "@/components/themes/header/header-logo";
import ProfileInfo from "@/components/themes/header/profile-info";
import ThemeSwitcher from "@/components/themes/header/theme-switcher";
import { SheetMenu } from "@/components/themes/sidebar/menu/sheet-menu";
import { SidebarToggle } from "@/components/themes/sidebar/sidebar-toogle";

import HorizontalMenu from "./horizontal-menu";

const AppHeader = async () => {
  return (
    <>
      <HeaderContent>
        <div className=" flex gap-3 items-center">
          <HeaderLogo />
          <SidebarToggle />
        </div>
        <div className="nav-tools flex items-center  md:gap-4 gap-3">
          <ThemeSwitcher />
          <ProfileInfo />
          <SheetMenu />
        </div>
      </HeaderContent>
      <HorizontalMenu />
    </>
  );
};

export default AppHeader;
