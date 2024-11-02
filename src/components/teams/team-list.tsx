"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Heading } from "@/components/heading";
import PaginationExt from "@/components/shared/pagination-ext";
import DefaultTeamLogo from "@/components/teams/team-logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { searchTeams } from "@/lib/actions/teams.action";
import { obfuscate } from "@/lib/endecode";
import { cn } from "@/lib/utils";
import { TeamType } from "@/types/teams";

export const TeamList = () => {
  const [items, setItems] = useState<Array<TeamType>>([]); // Store the items
  const [teamSearchTerm, setTeamSearchTerm] = useState<string | undefined>(
    undefined,
  );
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(0); // Total pages
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const fetchData = async () => {
    setLoading(true);
    try {
      const pageResult = await searchTeams(
        teamSearchTerm
          ? [{ field: "name", operator: "lk", value: teamSearchTerm }]
          : [],
        { page: currentPage, size: 10 },
      );
      setItems(pageResult.content);
      setTotalElements(pageResult.totalElements);
      setTotalPages(pageResult.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchTeams = useDebouncedCallback((teamName: string) => {
    const params = new URLSearchParams(searchParams);
    if (teamName) {
      params.set("name", teamName);
    } else {
      params.delete("name");
    }
    setTeamSearchTerm(teamName);
    replace(`${pathname}?${params.toString()}`);
  }, 2000);

  useEffect(() => {
    fetchData();
  }, [teamSearchTerm, currentPage]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-row justify-between">
        <div className="flex-shrink-0">
          <Heading
            title={`Teams (${totalElements})`}
            description="Manage teams"
          />
        </div>
        <div className="flex space-x-4">
          <Input
            className="w-[18rem]"
            placeholder="Search teams ..."
            onChange={(e) => {
              handleSearchTeams(e.target.value);
            }}
            defaultValue={searchParams.get("name")?.toString()}
          />
          <Link
            href={"/portal/teams/new/edit"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> New Team
          </Link>
        </div>
      </div>
      <Separator />
      <div className="flex flex-row flex-wrap space-x-6 space-y-6">
        {items?.map((team) => (
          <div
            key={team.id}
            className="w-[24rem] flex flex-row gap-4 border border-gray-200 px-4 py-4 rounded-2xl"
          >
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="size-24 cursor-pointer ring-offset-2 ring-2 ring-slate-200">
                      <AvatarImage src={undefined} alt="@shadcn" />
                      <AvatarFallback>
                        <DefaultTeamLogo />
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>{team.slogan}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div>
              <Button variant="link" asChild className="px-0">
                <Link href={`/portal/teams/${obfuscate(team.id)}`}>
                  {team.name}
                </Link>
              </Button>
              <div>{team.description}</div>
            </div>
          </div>
        ))}
      </div>
      <PaginationExt
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
};
