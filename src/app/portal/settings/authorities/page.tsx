"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { SimpleContentView } from "@/components/admin-panel/simple-content-view";
import { AuthoritiesTable } from "@/components/authorities/authority-table";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { usePagePermission } from "@/hooks/use-page-permission";
import { getAuthorities } from "@/lib/actions/authorities.action";
import { PermissionUtils } from "@/types/resources";

const breadcrumbItems = [
  { title: "Dashboard", link: "/portal" },
  { title: "Settings", link: "/portal/settings" },
  { title: "Authorities", link: "/portal/settings/authorities" },
];

const AuthoritiesPage = () => {
  const router = useRouter();
  const permissionLevel = usePagePermission();
  const [authorityPromise, setAuthorityPromise] = useState(getAuthorities);

  return (
    <SimpleContentView title="Authorities" breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-row justify-between">
        <Heading title="Authorities" description="Manage authorities" />
        {PermissionUtils.canWrite(permissionLevel) && (
          <Button
            onClick={() => router.push("/portal/settings/authorities/new/edit")}
          >
            <Plus />
            New Authority
          </Button>
        )}
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
