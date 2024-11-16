import { redirect } from "next/navigation";

export default function Home() {
  // Load the user authority permission

  redirect("/portal/dashboard");
}
