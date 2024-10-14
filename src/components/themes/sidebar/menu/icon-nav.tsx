"use client";
import Link from "next/link";
import React from "react";

import AppLogo from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useConfig } from "@/hooks/use-config";
import { Group } from "@/lib/menus";
import { cn } from "@/lib/utils";

interface IconNavProps {
  menuList: Group[];
}
const IconNav = ({ menuList }: IconNavProps) => {
  const [config, setConfig] = useConfig();

  return (
    <div className=" h-full bg-sidebar  border-r border-default-200 dark:border-secondary border-dashed w-[72px]">
      <div className="text-center py-5">
        <AppLogo className="  text-default-900 h-8 w-8 [&>path:nth-child(3)]:text-background [&>path:nth-child(2)]:text-background mx-auto" />
      </div>
      <ScrollArea className="[&>div>div[style]]:!block h-full">
        <nav className="mt-8 h-full w-full ">
          <ul className=" h-full flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-2 ">
            {menuList?.map(({ groupLabel, menus }, index) => (
              <li key={index} className=" block w-full">
                {menus?.map(
                  ({ href, label, icon, active, id, submenus }, menuIndex) => {
                    const Icon = icon;
                    return (
                      <TooltipProvider disableHoverableContent key={menuIndex}>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            {submenus.length === 0 ? (
                              <Button
                                onClick={() =>
                                  setConfig((prevConfig) => ({
                                    ...prevConfig,
                                    hasSubMenu: false,
                                    subMenu: true,
                                  }))
                                }
                                asChild
                                size="icon"
                                color="secondary"
                                variant={active ? "default" : "ghost"}
                                className={cn(
                                  "h-12 w-12 mx-auto mb-2 hover:ring-1 hover:ring-offset-0 hover:ring-default-200 dark:hover:ring-menu-arrow-active  hover:bg-default-100 dark:hover:bg-secondary   ",
                                  {
                                    "bg-default-100 dark:bg-secondary  hover:bg-default-200/80 dark:hover:bg-menu-arrow-active ring-1 ring-default-200 dark:ring-menu-arrow-active":
                                      active,
                                  },
                                )}
                              >
                                <Link href={href}>
                                  <Icon className=" w-6 h-6 text-default-500 dark:text-secondary-foreground " />
                                </Link>
                              </Button>
                            ) : (
                              <Button
                                onClick={() =>
                                  setConfig((prevConfig) => ({
                                    ...prevConfig,
                                    hasSubMenu: true,
                                    subMenu: false,
                                  }))
                                }
                                asChild
                                size="icon"
                                color="secondary"
                                variant={active ? "default" : "ghost"}
                                className={cn(
                                  "h-12 w-12 mx-auto mb-2 hover:ring-1 hover:ring-offset-0 hover:ring-default-200 dark:hover:ring-menu-arrow-active  hover:bg-default-100 dark:hover:bg-secondary   ",
                                  {
                                    "bg-default-100 dark:bg-secondary  hover:bg-default-200/80 dark:hover:bg-menu-arrow-active ring-1 ring-default-200 dark:ring-menu-arrow-active":
                                      active,
                                  },
                                )}
                              >
                                <Link href={href}>
                                  <Icon className=" w-6 h-6 text-default-500 dark:text-secondary-foreground " />
                                </Link>
                              </Button>
                            )}
                          </TooltipTrigger>

                          <TooltipContent side="right">{label}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  },
                )}
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>
    </div>
  );
};

export default IconNav;
