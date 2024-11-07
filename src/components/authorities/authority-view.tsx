"use client";

import { Edit, Ellipsis, Pencil, Plus, Trash } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import NewAuthorityDialog from "@/components/authorities/authority-new-dialog";
import { Heading } from "@/components/heading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ViewProps } from "@/components/ui/ext-form";
import DefaultUserLogo from "@/components/users/user-logo";
import { getUsersByAuthority } from "@/lib/actions/users.action";
import { obfuscate } from "@/lib/endecode";
import { AuthorityType } from "@/types/authorities";
import { UserType } from "@/types/users";

export const AuthorityView: React.FC<ViewProps<AuthorityType>> = ({
  entity,
}: ViewProps<AuthorityType>) => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<Array<UserType>>();
  const [authority, setAuthority] = useState<AuthorityType>(entity);

  useEffect(() => {
    async function fetchUsers() {
      const userData = await getUsersByAuthority(authority.name);
      setUsers(userData);
    }
    fetchUsers();
  }, []);

  function onEditAuthoritySuccess(savedAuthority: AuthorityType) {
    setAuthority(savedAuthority);
  }

  return (
    <div className="grid grid-cols-1 gap-4 py-4">
      <div className="flex flex-row justify-between">
        <Heading
          title={authority.descriptiveName}
          description={authority.description ?? ""}
        />
        <div className="flex space-x-4">
          <Button>
            <Plus /> Add User
          </Button>
          <Button onClick={() => setOpen(true)}>
            <Edit /> Edit
          </Button>
        </div>
        <NewAuthorityDialog
          open={open}
          setOpen={setOpen}
          authorityEntity={authority}
          onSaveSuccess={onEditAuthoritySuccess}
        />
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        {users?.map((user: UserType) => (
          <div
            className="w-[28rem] flex flex-row gap-4 border border-gray-200 px-4 py-4 rounded-2xl relative"
            key={user.id}
          >
            <div>
              <Avatar className="size-24 cursor-pointer ">
                <AvatarImage
                  src={
                    user?.imageUrl ? `/api/files/${user.imageUrl}` : undefined
                  }
                  alt={`${user.firstName} ${user.lastName}`}
                />
                <AvatarFallback>
                  <DefaultUserLogo />
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div className="text-xl">
                <Button variant="link" asChild className="px-0">
                  <Link href={`/portal/users/${obfuscate(user.id)}`}>
                    {user.firstName}, {user.lastName}
                  </Link>
                </Button>
              </div>
              <div>
                <b>Email:</b>{" "}
                <Link href={`mailto:${user.email}`}>{user.email}</Link>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Ellipsis className="cursor-pointer absolute top-2 right-2 text-gray-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[14rem]">
                <DropdownMenuItem className="cursor-pointer">
                  <Pencil />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Trash /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  );
};
