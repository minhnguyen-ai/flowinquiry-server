import { SimpleContentView } from "@/components/admin-panel/simple-content-view";

const breadcrumbItems = [
  { title: "Dashboard", link: "/portal" },
  { title: "Contacts", link: "/portal/contacts" },
];

const ContactPage = () => {
  return (
    <SimpleContentView title="Contacts" breadcrumbItems={breadcrumbItems}>
      <div>Contacts</div>
    </SimpleContentView>
  );
};

export default ContactPage;
