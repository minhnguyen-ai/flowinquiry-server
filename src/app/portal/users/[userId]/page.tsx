import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import DefaultUserLogo from "@/components/users/user-logo";
import { findTeamsByMemberId } from "@/lib/actions/teams.action";
import { findUserById } from "@/lib/actions/users.action";
import { deobfuscateToNumber, obfuscate } from "@/lib/endecode";

const Page = async ({ params }: { params: { userId: string } }) => {
  const user = await findUserById(deobfuscateToNumber(params.userId));
  if (!user) {
    notFound();
  }

  const teams = await findTeamsByMemberId(user.id!);

  const breadcrumbItems = [
    { title: "Dashboard", link: "/portal" },
    { title: "Users", link: "/portal/users" },
    { title: `${user.firstName} ${user.lastName}`, link: "#" },
  ];

  return (
    <ContentLayout title="Users">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex flex-col md:flex-row items-start py-4 gap-4">
        <div className="grid grid-cols-1 w-full md:w-[18rem] space-x-4 space-y-4 gap-4 justify-items-start rounded-lg border border-gray-300">
          <div className="flex justify-center w-full pt-4">
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

          <div className="text-sm py-4">
            <div>
              Email: <a href={`mailto: ${user.email}`}>{user.email}</a>
            </div>
            <div>Title: {user.title}</div>
            <div>
              Last login time:{" "}
              {user.lastLoginTime
                ? formatDistanceToNow(new Date(user.lastLoginTime), {
                    addSuffix: true,
                  })
                : "No recent login"}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 w-full md:w-[56rem] rounded-lg border border-gray-300 px-4 py-4">
          <div className="text-xl relative">
            <span>
              {user.firstName} {user.lastName}
            </span>
            <span className="text-sm absolute px-2 top-0">{user.timezone}</span>
          </div>
          <div className="grid grid-cols-1 px-4 py-4 gap-4 text-sm">
            <div>About: {user.about}</div>
            <div>Address: {user.address}</div>
            <div>City: {user.city}</div>
            <div>State: {user.state}</div>
            <div>Country: {user.country}</div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="text-sm">Member of Teams</div>
            <div className="flex flex-row flex-wrap gap-4">
              {teams.map((team) => (
                <Badge key={team.id}>
                  <Link href={`/portal/teams/${obfuscate(team.id)}`}>
                    {team.name}
                  </Link>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Page;
