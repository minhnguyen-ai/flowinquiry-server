"use client";

import TeamUsersView from "@/components/teams/team-users";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ViewProps } from "@/components/ui/ext-form";
import { TeamType } from "@/types/teams";

const TeamView = ({ initialData: team }: ViewProps<TeamType>) => {
  return (
    <div className="w-full">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>{team.name}</CardTitle>
          <CardDescription>{team.slogan}</CardDescription>
        </CardHeader>
        <CardContent>
          <TeamUsersView initialData={team.id!} />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default TeamView;
