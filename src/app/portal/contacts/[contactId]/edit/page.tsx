import { SimpleContentView } from "@/components/admin-panel/simple-content-view";
import ContactForm from "@/components/contacts/contact-form";
import { findContactById } from "@/lib/actions/contacts.action";
import { deobfuscateToNumber } from "@/lib/endecode";

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
  const contact =
    params.contactId !== "new"
      ? await findContactById(deobfuscateToNumber(params.contactId))
      : undefined;

  return (
    <SimpleContentView title="Contacts" breadcrumbItems={breadcrumbItems}>
      <ContactForm initialData={contact} />
    </SimpleContentView>
  );
}
