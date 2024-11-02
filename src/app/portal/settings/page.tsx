import Link from "next/link";
import React from "react";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const breadcrumbItems = [
  { title: "Dashboard", link: "/portal" },
  { title: "Settings", link: "/portal/settings" },
];

const SettingsPage = () => {
  return (
    <ContentLayout title="Settings">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="py-4">
        <Card className="w-[20em] rounded-xl">
          <CardHeader>
            <CardTitle>
              <Button variant="link">
                <Link href="/portal/settings/authorities">Authorities</Link>
              </Button>
            </CardTitle>
            <CardDescription>
              Manage permissions for groups and users to control access to
              resources
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </ContentLayout>
  );
};

export default SettingsPage;
