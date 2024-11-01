"use client";

import { formatDistanceToNow } from "date-fns";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Heading } from "@/components/heading";
import PaginationExt from "@/components/shared/pagination-ext";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { searchUsers } from "@/lib/actions/users.action";
import { cn } from "@/lib/utils";
import { UserType } from "@/types/users";

export const UserList = () => {
  const [items, setItems] = useState<Array<UserType>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState<string | undefined>(
    undefined,
  );

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const fetchData = async () => {
    setLoading(true);
    try {
      const pageResult = await searchUsers(
        userSearchTerm
          ? [
              {
                field: "firstName,lastName",
                operator: "lk",
                value: userSearchTerm,
              },
            ]
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

  const handleSearchTeams = useDebouncedCallback((userName: string) => {
    const params = new URLSearchParams(searchParams);
    console.log(`Search ${userName}`);
    if (userName) {
      params.set("name", userName);
    } else {
      params.delete("name");
    }
    setUserSearchTerm(userName);
    replace(`${pathname}?${params.toString()}`);
  }, 2000);

  useEffect(() => {
    fetchData();
  }, [currentPage, userSearchTerm]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-card px-6 py-6 rounded-2xl h-full">
      <div className="flex flex-row justify-between">
        <Heading
          title={`Users (${totalElements})`}
          description="Manage users"
        />

        <div className="flex space-x-4">
          <Input
            className="w-[18rem]"
            placeholder="Search user names ..."
            onChange={(e) => {
              handleSearchTeams(e.target.value);
            }}
            defaultValue={searchParams.get("name")?.toString()}
          />
          <Link
            href={"/portal/users/new/edit"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Invite user
          </Link>
        </div>
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
