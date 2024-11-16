"use client";

import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DefaultUserLogo from "@/components/users/user-logo";
import { obfuscate } from "@/lib/endecode";
import { UserType } from "@/types/users";

interface UserCardProps {
  user: UserType;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <div
    key={user.id}
    className="w-[28rem] flex flex-row gap-4 border border-gray-200 px-4 py-4 rounded-2xl"
  >
    <div>
      <Avatar className="size-24 cursor-pointer ">
        <AvatarImage
          src={user?.imageUrl ? `/api/files/${user.imageUrl}` : undefined}
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
        <b>Email:</b> <Link href={`mailto:${user.email}`}>{user.email}</Link>
      </div>
      <div>Timezone: {user.timezone}</div>
      <div>
        Last login time:{" "}
        {user.lastLoginTime
          ? formatDistanceToNow(new Date(user.lastLoginTime), {
              addSuffix: true,
            })
          : "No recent login"}
      </div>
      <div className="flex flex-row space-x-1">
        Authorities:{" "}
        {user.authorities?.map((authority) => (
          <Badge key={authority.name}>{authority.descriptiveName}</Badge>
        ))}
      </div>
    </div>
  </div>
);

export default UserCard;
