"use server";

import { accountSchema } from "@/types/accounts";
import { BACKEND_API } from "@/lib/constants";
import { auth } from "@/auth";
import { ActionResult } from "@/types/commons";

export const getAccounts = async () => {
  try {
    const session = await auth();

    console.log(`Token ${JSON.stringify(session)}`);
    const res = await fetch(`${BACKEND_API}/api/accounts`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${session.token}`,
      },
    });
    if (res.ok) {
      let x = await res.json();
      console.log("Result " + JSON.stringify(x));
      return x;
    } else {
      console.log("Error");
    }
  } catch (error) {
    console.log("Error occurs while getting accounts", error);
  }
};

export const saveAccount = async (
  prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> => {
  console.log("Form " + formData);
  const validation = accountSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (validation.success) {
    console.log("Save entity");
    const session = await auth();
    const response = await fetch(`${BACKEND_API}/api/accounts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
    if (response.ok) {
      return { status: "success" };
    } else {
      return { status: "system_error", text: response.statusText };
    }
  } else {
    return { status: "user_error" };
  }
};
