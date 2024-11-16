"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Heading } from "@/components/heading";
import PaginationExt from "@/components/shared/pagination-ext";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import UserCard from "@/components/users/user-card";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { usePagePermission } from "@/hooks/use-page-permission";
import { searchUsers } from "@/lib/actions/users.action";
import { cn } from "@/lib/utils";
import { PermissionUtils } from "@/types/resources";
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
  const permissionLevel = usePagePermission();

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
    <div className="py-4 grid grid-cols-1 gap-4">
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
          {PermissionUtils.canWrite(permissionLevel) && (
            <Link
              href={"/portal/users/new/edit"}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              <Plus className="mr-2 h-4 w-4" /> Invite user
            </Link>
          )}
        </div>
      </div>
      <Separator />
      <div className="flex flex-row flex-wrap gap-4 content-around">
        {items?.map((user) => UserCard({ user }))}
      </div>
      <PaginationExt
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};
