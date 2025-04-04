import React from "react";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import TicketListView from "@/components/teams/ticket-list-view";

const Page = () => {
  return (
    <ContentLayout title="Teams">
      <TicketListView />
    </ContentLayout>
  );
};

export default Page;
