"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConfig } from "@/hooks/use-config";
import { Group } from "@/lib/menus";
import MenuLabel from "@/components/themes/sidebar/common/menu-label";
import { CollapseMenuButton2 } from "@/components/themes/sidebar/common/collapse-menu-button2";

const SidebarNav = ({ menuList }: { menuList: Group[] }) => {
  const [config, setConfig] = useConfig();
  const pathname = usePathname();
  const params = useParams<{ locale: string }>();
  const direction = "ltr";
  const activeKey = pathname?.split("/")?.[2];
  const data = menuList.find((item) => item.id === activeKey);

  // Render null if config.subMenu is true
  if (config.subMenu || !config.hasSubMenu) {
    return null;
  }

  return (
    <div className=" h-full bg-sidebar  shadow-base  w-[228px] relative z-20">
      {config.sidebarBgImage !== undefined && (
        <div
          className=" absolute left-0 top-0  z-10 w-full h-full bg-cover bg-center opacity-[0.07]"
          style={{ backgroundImage: `url(${config.sidebarBgImage})` }}
        ></div>
      )}

      <ScrollArea className="[&>div>div[style]]:!block h-full" dir={direction}>
        <div className="px-4 pt-6  sticky top-0  bg-sidebar z-20">
          {data?.groupLabel && (
            <MenuLabel
              label={data?.groupLabel}
              className=" text-xl py-0 font-semibold  capitalize text-default "
            />
          )}
        </div>
        <nav className="mt-6 h-full w-full ">
          <ul className=" h-full  space-y-1.5 flex flex-col  items-start  px-4 pb-8 ">
            {data?.menus.map(({ submenus }, index) =>
              submenus?.map(
                ({ href, label, active, icon, children: subChildren }, i) => {
                  const Icon = icon;
                  return (
                    <li key={`double-menu-index-${i}`} className=" w-full ">
                      {subChildren?.length === 0 ? (
                        <Button
                          asChild
                          color={active ? "default" : "secondary"}
                          variant={active ? "default" : "ghost"}
                          className="  h-10 capitalize justify-start md:px-3 px-3 "
                        >
                          <Link href={href}>
                            {Icon && <Icon className="h-5 w-5 me-2" />}

                            <p>{label}</p>
                          </Link>
                        </Button>
                      ) : (
                        subChildren && (
                          <CollapseMenuButton2
                            icon={icon}
                            label={label}
                            active={active}
                            submenus={subChildren}
                          />
                        )
                      )}
                    </li>
                  );
                },
              ),
            )}
          </ul>
        </nav>
      </ScrollArea>
    </div>
  );
};

export default SidebarNav;
