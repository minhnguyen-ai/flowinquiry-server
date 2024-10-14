"use server";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { ActionResult } from "@/types/commons";

export const fetchData = async <TData, TResponse>(
  url: string,
  method: string,
  data?: TData,
): Promise<ActionResult<TResponse>> => {
  const session = await auth();
  const response = await fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
    ...(data && { body: JSON.stringify(data) }),
  });

  if (response.ok) {
    const data = (await response.json()) as TResponse;
    return { ok: true, status: "success", data };
  } else {
    // Unauthorized access
    if (response.status === 401) {
      console.log("Unauthorized access. Redirect to the login page");
      redirect("/login");
    } else {
      return {
        ok: false,
        status: "system_error",
        message: response.statusText,
      };
    }
  }
};

export const get = async <TResponse>(
  url: string,
): Promise<ActionResult<TResponse>> => {
  return fetchData(url, "GET");
};

export const post = async <TData, TResponse>(
  url: string,
  data?: TData,
): Promise<ActionResult<TResponse>> => {
  return fetchData(url, "POST", data);
};

export const put = async <TData, TResponse>(
  url: string,
  data?: TData,
): Promise<ActionResult<TResponse>> => {
  return fetchData(url, "PUT", data);
};
