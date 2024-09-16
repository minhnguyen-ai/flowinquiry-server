import { auth } from "@/auth";
import { ActionResult } from "@/types/commons";

export const fetchData = async <T>(url: string): Promise<ActionResult<T>> => {
  try {
    const session = await auth();
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });

    if (response.ok) {
      const data = (await response.json()) as T;
      return { ok: true, status: "success", data };
    } else {
      return {
        ok: false,
        status: "system_error",
        message: response.statusText,
      };
    }
  } catch (error) {
    return {
      ok: false,
      status: "system_error",
      message: (error as Error).message,
    };
  }
};
