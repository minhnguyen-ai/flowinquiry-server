import { notFound } from "next/navigation";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { findContactById } from "@/lib/actions/contacts.action";
import { deobfuscateToNumber } from "@/lib/endecode";

const Page = async ({ params }: { params: { contactId: string } }) => {
  const contact = await findContactById(deobfuscateToNumber(params.contactId));
  if (!contact) {
    notFound();
  }

  const breadcrumbItems = [
    { title: "Dashboard", link: "/portal" },
    { title: "Contacts", link: "/portal/contacts" },
    { title: `${contact.firstName} ${contact.lastName}`, link: "#" },
  ];

  return (
    <ContentLayout title="Teams">
      <Breadcrumbs items={breadcrumbItems} />
    </ContentLayout>
  );
};

export default Page;
