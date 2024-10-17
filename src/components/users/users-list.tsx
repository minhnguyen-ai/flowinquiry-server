"use client";

import { formatDistanceToNow } from "date-fns";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Heading } from "@/components/heading";
import PaginationExt from "@/components/shared/pagination-ext";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { searchUsers } from "@/lib/actions/users.action";
import { cn } from "@/lib/utils";
import { UserType } from "@/types/users";

export const UserList = () => {
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
      const { ok, data: pageResult } = await searchUsers({
        page: page,
        size: itemsPerPage,
      });
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
    <div className="bg-card px-6 py-6">
      <div className="flex flex-row justify-between">
        <Heading
          title={`Users (${totalElements})`}
          description="Manage users"
        />

        <Link
          href={"/portal/users/new/edit"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <Plus className="mr-2 h-4 w-4" /> Invite user
        </Link>
      </div>
      <Separator />
      <div className="flex flex-row flex-wrap space-x-4 space-y-4 content-around">
        {items?.map((user) => (
          <Card key={user.id} className="w-[28rem]">
            <CardContent className="p-5">
              <div className="flex flex-col">
                <div className="text-2xl text-amber-500">
                  {user.firstName}, {user.lastName}
                </div>
                <div>
                  <b>Email:</b>{" "}
                  <Link href={`mailto:${user.email}`}>{user.email}</Link>
                </div>
                <div>Timezone: {user.timezone}</div>
                <div>
                  Last login time:{" "}
                  {user.lastLoginTime
                    ? formatDistanceToNow(new Date(user.lastLoginTime), {
                        addSuffix: true,
                      })
                    : ""}
                </div>
                <div className="flex flex-row space-x-1">
                  Authorities:{" "}
                  <div className="flex flex-row flex-wrap space-x-1">
                    {user.authorities?.map((authority) => (
                      <Badge key={authority.name}>
                        {authority.descriptiveName}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
