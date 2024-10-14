"use client";
import Link from "next/link";
import React from "react";

import AppLogo from "@/components/app-logo";
import { useConfig } from "@/hooks/use-config";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMenuHoverConfig } from "@/hooks/use-menu-hover";

const Logo = () => {
  const [config] = useConfig();
  const [hoverConfig] = useMenuHoverConfig();
  const { hovered } = hoverConfig;
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  if (config.sidebar === "compact") {
    return (
      <Link
        href="/dashboard/analytics"
        className="flex gap-2 items-center   justify-center    "
      >
        <AppLogo className="  text-default-900 h-8 w-8 [&>path:nth-child(3)]:text-background [&>path:nth-child(2)]:text-background" />
      </Link>
    );
  }
  if (config.sidebar === "two-column" || !isDesktop) return null;

  return (
    <Link href="/dashboard/analytics" className="flex gap-2 items-center    ">
      <AppLogo className="  text-default-900 h-8 w-8 [&>path:nth-child(3)]:text-background [&>path:nth-child(2)]:text-background" />
      {(!config?.collapsed || hovered) && (
        <h1 className="text-xl font-semibold text-default-900 ">Flexwork</h1>
      )}
    </Link>
  );
};

export default Logo;
