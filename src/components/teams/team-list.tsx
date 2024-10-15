"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Heading } from "@/components/heading";
import CustomPagination from "@/components/shared/customPagination";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { searchTeams } from "@/lib/actions/teams.action";
import { obfuscate } from "@/lib/endecode";
import { cn } from "@/lib/utils";
import { TeamType } from "@/types/teams";

export const TeamList = () => {
  const [items, setItems] = useState<Array<TeamType>>([]); // Store the items
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(0); // Total pages
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const itemsPerPage = 10; // Customize the number of items per page

  const fetchData = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      // Replace this with your actual API call
      const { ok, data: pageResult } = await searchTeams({
        page: page,
        size: itemsPerPage,
      });
      if (ok) {
        setItems(pageResult.content); // Update items
        setTotalPages(pageResult.totalPages); // Update total pages
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts or page changes
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-card px-6 py-6">
      <div className="flex flex-row justify-between">
        <Heading title={`Teams`} description="Manage teams" />

        <Link
          href={"/portal/teams/new/edit"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <Plus className="mr-2 h-4 w-4" /> New Team
        </Link>
      </div>
      <Separator />
      <div className="flex flex-row flex-wrap space-x-4 space-y-4 content-around">
        {items?.map((team) => (
          <div>
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
              <CardContent className="p-5">${team.description}</CardContent>
            </Card>
          </div>
        ))}
      </div>
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};
