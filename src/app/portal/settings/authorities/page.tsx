"use client";

import { Plus } from "lucide-react";
import React, { useState } from "react";

import NewAuthorityDialog from "@/components/authorities/authority-new-dialog";
import { AuthoritiesTable } from "@/components/authorities/authority-table";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAuthorities } from "@/lib/actions/authorities.action";

const breadcrumbItems = [
  { title: "Dashboard", link: "/portal" },
  { title: "Settings", link: "/portal/settings" },
  { title: "Authorities", link: "/portal/settings/authorities" },
];

const AuthoritiesPage = () => {
  const [open, setOpen] = useState(false);
  const authorityPromise = getAuthorities();

  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="bg-card px-6 py-6 rounded-2xl">
        <div className="flex flex-row justify-between">
          <Heading title="Authorities" description="Manage authorities" />
          <Button onClick={() => setOpen(true)}>
            <Plus />
            New Authority
          </Button>
          <NewAuthorityDialog open={open} setOpen={setOpen} />
        </div>
        <Separator />
        <AuthoritiesTable
          authoritiesPromise={authorityPromise}
          enableAdvancedFilter={true}
        />
      </div>
    </div>
  );
};

export default AuthoritiesPage;
