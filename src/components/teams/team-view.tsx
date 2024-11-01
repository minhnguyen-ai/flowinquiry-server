"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

import { Heading } from "@/components/heading";
import TeamUsersView from "@/components/teams/team-users";
import { buttonVariants } from "@/components/ui/button";
import { ViewProps } from "@/components/ui/ext-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { TeamType } from "@/types/teams";

const TeamView = ({ entity: team }: ViewProps<TeamType>) => {
  return (
    <div className="w-full bg-card px-6 py-6">
      <div className="flex items-center justify-between">
        <Heading
          title={team.name}
          description={team.slogan ?? "Stronger Together"}
        />
        <div className="flex space-x-4">
          <Input
            className="w-[18rem]"
            placeholder="Search users ..."
            // onChange={(e) => {
            //     handleSearchTeams(e.target.value);
            // }}
            // defaultValue={searchParams.get("name")?.toString()}
          />
          <Link
            href={"/portal/teams/new/edit"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Invite user
          </Link>
        </div>
      </div>
      <TeamUsersView entity={team.id!} />
    </div>
  );
};

export default TeamView;
