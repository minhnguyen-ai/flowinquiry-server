"use client";

import { Heading } from "@/components/heading";
import TeamUsersView from "@/components/teams/team-users";
import { ViewProps } from "@/components/ui/ext-form";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamType } from "@/types/teams";

const TeamView = ({ entity: team }: ViewProps<TeamType>) => {
  return (
    <div className="grid grid-cols-1 gap-4 py-4">
      <div className="flex items-center justify-between">
        <Heading
          title={team.name}
          description={team.slogan ?? "Stronger Together"}
        />
      </div>
      <Separator />
      <Tabs defaultValue="members">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
        </TabsList>
        <TabsContent value="members">
          <TeamUsersView entity={team.id!} />
        </TabsContent>
        <TabsContent value="requests"></TabsContent>
        <TabsContent value="workflows"></TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamView;
