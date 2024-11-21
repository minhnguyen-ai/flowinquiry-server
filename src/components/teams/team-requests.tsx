"use client";

import { Plus } from "lucide-react";
import React, { useState } from "react";

import { Heading } from "@/components/heading";
import NewRequestToTeamDialog from "@/components/teams/team-new-request-dialog";
import TeamRequestsStatusView from "@/components/teams/team-requests-status";
import { Button } from "@/components/ui/button";
import { ViewProps } from "@/components/ui/ext-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePagePermission } from "@/hooks/use-page-permission";
import { useUserTeamRole } from "@/providers/user-team-role-provider";
import { PermissionUtils } from "@/types/resources";
import { TeamType } from "@/types/teams";

const TeamRequestsView = ({ entity: team }: ViewProps<TeamType>) => {
  const permissionLevel = usePagePermission();
  const teamRole = useUserTeamRole().role;
  const [open, setOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-row justify-between">
        <div className="flex-shrink-0">
          <Heading title={`Requests`} description="Manage team requests" />
        </div>
        {(PermissionUtils.canWrite(permissionLevel) ||
          teamRole === "Manager" ||
          teamRole === "Member" ||
          teamRole === "Guest") && (
          <div>
            <Button onClick={() => setOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> New Request
            </Button>
            <NewRequestToTeamDialog
              open={open}
              setOpen={setOpen}
              teamEntity={team}
              onSaveSuccess={() => console.log("Save success")}
            />
          </div>
        )}
      </div>
      <Tabs defaultValue="open" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="assigned">Assigned</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>
        <TabsContent value="open">
          <TeamRequestsStatusView entity={team} />
        </TabsContent>
        <TabsContent value="assigned">Assigned</TabsContent>
        <TabsContent value="closed">Closed</TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamRequestsView;
