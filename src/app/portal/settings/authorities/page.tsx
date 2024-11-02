"use client";

import { Plus } from "lucide-react";
import React, { useState } from "react";

import { SimpleContentView } from "@/components/admin-panel/simple-content-view";
import NewAuthorityDialog from "@/components/authorities/authority-new-dialog";
import { AuthoritiesTable } from "@/components/authorities/authority-table";
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
  const [authorityPromise, setAuthorityPromise] = useState(getAuthorities);

  function onSaveAuthoritySuccess() {
    setAuthorityPromise(getAuthorities());
  }

  return (
    <SimpleContentView title="Authorities" breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-row justify-between">
        <Heading title="Authorities" description="Manage authorities" />
        <Button onClick={() => setOpen(true)}>
          <Plus />
          New Authority
        </Button>
        <NewAuthorityDialog
          open={open}
          setOpen={setOpen}
          onSaveSuccess={onSaveAuthoritySuccess}
        />
      </div>
      <Separator />
      <AuthoritiesTable
        authoritiesPromise={authorityPromise}
        enableAdvancedFilter={true}
      />
    </SimpleContentView>
  );
};

export default AuthoritiesPage;
