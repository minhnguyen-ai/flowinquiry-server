"use client";

import { useEffect, useState } from "react";

import PaginationExt from "@/components/shared/pagination-ext";
import { ViewProps } from "@/components/ui/ext-form";
import UserCard from "@/components/users/user-card";
import { findMembersByTeamId } from "@/lib/actions/teams.action";
import { UserType } from "@/types/users";

const TeamUsersView = ({ entity: teamId }: ViewProps<number>) => {
  const [items, setItems] = useState<Array<UserType>>([]); // Store the items
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(0); // Total pages
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state
  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const pageResult = await findMembersByTeamId(teamId);

      setItems(pageResult.content); // Update items
      setTotalElements(pageResult.totalElements);
      setTotalPages(pageResult.totalPages); // Update total pages
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts or page changes
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex flex-row flex-wrap space-x-4 space-y-4 content-around">
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

export default TeamUsersView;
