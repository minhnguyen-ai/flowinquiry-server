"use client";

import {
  AirplayIcon,
  BikeIcon,
  ChevronDown,
  LanguagesIcon,
  Phone,
  Power,
  User,
  UserPlus,
  Users,
  Variable,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { auth, signOut } from "@/lib/auth";

const ProfileInfo = () => {
  const { data: session, status } = useSession();

  return (
    <div className="md:block hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className=" cursor-pointer">
          <div className=" flex items-center gap-3  text-default-800 ">
            <div className="text-sm font-medium  capitalize lg:block hidden  ">
              {session?.user?.name}
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
                {session?.user?.name}
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
                href: "/user-profile",
              },
              {
                name: "Billing",
                icon: BikeIcon,
                href: "/dashboard",
              },
              {
                name: "Settings",
                icon: AirplayIcon,
                href: "/dashboard",
              },
              {
                name: "Keyboard shortcuts",
                icon: LanguagesIcon,
                href: "/dashboard",
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
            <Link href="/dashboard" className="cursor-pointer">
              <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 cursor-pointer">
                <Users />
                team
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 ">
                <UserPlus />
                Invite user
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {[
                    {
                      name: "email",
                    },
                    {
                      name: "message",
                    },
                    {
                      name: "facebook",
                    },
                  ].map((item, index) => (
                    <Link
                      href="/dashboard"
                      key={`message-sub-${index}`}
                      className="cursor-pointer"
                    >
                      <DropdownMenuItem className="text-sm font-medium text-default-600 capitalize px-3 py-1.5 cursor-pointer">
                        {item.name}
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <Link href="/dashboard">
              <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 cursor-pointer">
                <Variable className="w-4 h-4" />
                Github
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 cursor-pointer">
                <Phone className="w-4 h-4" />
                Support
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {[
                    {
                      name: "portal",
                    },
                    {
                      name: "slack",
                    },
                    {
                      name: "whatsapp",
                    },
                  ].map((item, index) => (
                    <Link href="/dashboard" key={`message-sub-${index}`}>
                      <DropdownMenuItem className="text-sm font-medium text-default-600 capitalize px-3 py-1.5 cursor-pointer">
                        {item.name}
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="mb-0 dark:bg-background" />
          <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 cursor-pointer">
            <div>
              <form
                action={async () => {
                  // "use server";
                  // await signOut();
                  console.log("Sign out");
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
    </div>
  );
};
export default ProfileInfo;
