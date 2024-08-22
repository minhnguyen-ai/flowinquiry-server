import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  if (!session) {
    console.log("No session defined. Redirect to login page");
    redirect("/login");
  } else {
    redirect("/portal");
  }
}
