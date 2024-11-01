"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Heading } from "@/components/heading";
import PaginationExt from "@/components/shared/pagination-ext";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
    <div className="bg-card px-6 py-6 w-full">
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
      <div className="flex flex-row flex-wrap space-x-4 space-y-4 content-around">
        {items?.map((team) => (
          <Card key={team.id} className="w-[28rem]">
            <CardHeader>
              <CardTitle>
                <Button variant="link" asChild>
                  <Link href={`/portal/teams/${obfuscate(team.id)}`}>
                    {team.name}
                  </Link>
                </Button>
              </CardTitle>
              <CardDescription>{team.slogan}</CardDescription>
            </CardHeader>
            <CardContent className="p-5">{team.description}</CardContent>
          </Card>
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
