"use client";

import { ChevronDown, Info, Power, User } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfileInfo = () => {
  const { data: session, status } = useSession();

  return (
    <div className="md:block hidden">
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className=" cursor-pointer">
            <div className=" flex items-center gap-3  text-default-800 ">
              <div className="text-sm font-medium  capitalize lg:block hidden  ">
                {session?.user?.firstName}
              </div>
              <span className="text-base  me-2.5 lg:inline-block hidden">
                <ChevronDown />
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 p-0" align="end">
            <DropdownMenuLabel className="flex gap-2 items-center mb-1 p-3">
              <div>
                <div className="text-sm font-medium text-default-800 capitalize ">
                  {session?.user?.firstName}
                </div>
                <Link
                  href="/dashboard"
                  className="text-xs text-default-600 hover:text-primary"
                >
                  {session?.user?.email}
                </Link>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              {[
                {
                  name: "profile",
                  icon: User,
                  href: "/portal/profile",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    href={item.href}
                    key={`info-menu-${index}`}
                    className="cursor-pointer"
                  >
                    <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 cursor-pointer">
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </DropdownMenuItem>
                  </Link>
                );
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DialogTrigger asChild>
                <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 cursor-pointer">
                  <Info className="w-4 h-4" />
                  About
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="mb-0 dark:bg-background" />
            <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 cursor-pointer">
              <div>
                <form
                  action={async () => {
                    // "use server";
                    // await signOut();
                    await signOut();
                  }}
                >
                  <button
                    type="submit"
                    className=" w-full  flex  items-center gap-2"
                  >
                    <Power className="w-4 h-4" />
                    Log out
                  </button>
                </form>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Flexwork</DialogTitle>
            <DialogDescription>
              Flexwork, the powerful requests management for teams
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ProfileInfo;
