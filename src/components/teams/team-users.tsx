"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import PaginationExt from "@/components/shared/pagination-ext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ViewProps } from "@/components/ui/ext-form";
import { findMembersByTeamId } from "@/lib/actions/teams.action";
import { obfuscate } from "@/lib/endecode";
import { UserType } from "@/types/users";

const TeamUsersView = ({ entity: teamId }: ViewProps<number>) => {
  const [items, setItems] = useState<Array<UserType>>([]); // Store the items
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(0); // Total pages
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const itemsPerPage = 10; // Customize the number of items per page
  const fetchData = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      // Replace this with your actual API call
      const { ok, data: pageResult } = await findMembersByTeamId(teamId);
      if (ok) {
        setItems(pageResult.content); // Update items
        setTotalElements(pageResult.totalElements);
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
    <div>
      Members
      <div className="flex flex-row flex-wrap space-x-4 space-y-4 content-around">
        {items?.map((user) => (
          <div>
            <Card key={user.id} className="w-[28rem]">
              <CardHeader>
                <CardTitle>
                  <Button variant="link" asChild>
                    <Link href={`/portal/users/${obfuscate(user.id)}`}>
                      {user.lastName}
                    </Link>
                  </Button>
                </CardTitle>
                <CardDescription>{user.firstName}</CardDescription>
              </CardHeader>
              <CardContent className="p-5">${user.email}</CardContent>
            </Card>
          </div>
        ))}
      </div>
      <PaginationExt
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default TeamUsersView;
