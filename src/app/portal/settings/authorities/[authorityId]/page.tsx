import { notFound } from "next/navigation";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { AuthorityView } from "@/components/authorities/authority-view";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { findAuthorityByName } from "@/lib/actions/authorities.action";
import { deobfuscateToString } from "@/lib/endecode";

const Page = async ({ params }: { params: { authorityId: string } }) => {
  const authority = await findAuthorityByName(
    deobfuscateToString(params.authorityId),
  );
  if (!authority) {
    notFound();
  }

  const breadcrumbItems = [
    { title: "Dashboard", link: "/portal" },
    { title: "Authorities", link: "/portal/settings/authorities" },
    { title: `${authority.descriptiveName}`, link: "#" },
  ];

  return (
    <ContentLayout title="Authorities">
      <Breadcrumbs items={breadcrumbItems} />
      <AuthorityView entity={authority} />
    </ContentLayout>
  );
};

export default Page;
