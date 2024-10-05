import { Breadcrumbs } from "@/components/breadcrumbs";
import ContactForm from "@/components/contacts/contact-form";
import { findContactById } from "@/lib/actions/contacts.action";
import { deobfuscateToNumber } from "@/lib/endecode";
import { ContactType } from "@/types/contacts";

const breadcrumbItems = [
  { title: "Dashboard", link: "/portal" },
  { title: "Contacts", link: "/portal/contacts" },
  { title: "Create", link: "/portal/contacts/new" },
];

export default async function Page({
  params,
}: {
  params: { contactId: string | "new" };
}) {
  const { data: contact } =
    params.contactId !== "new"
      ? await findContactById(deobfuscateToNumber(params.contactId))
      : { data: undefined as ContactType | undefined };

  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <ContactForm initialData={contact} />
    </div>
  );
}
