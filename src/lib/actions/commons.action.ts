"use server";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { ActionResult, PageableResult } from "@/types/commons";
import {
  buildSearchQuery,
  Filter,
  Pagination,
  paginationSchema,
  querySchema,
} from "@/types/query";

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

// Default pagination object
const defaultPagination: Pagination = {
  page: 1,
  size: 10,
};

// Function to send a dynamic search query with pagination and URL
export const doAdvanceSearch = async <T>(
  url: string, // URL is passed as a parameter
  filters: Filter<T>[] = [], // Filters for the search
  pagination: Pagination = defaultPagination, // Default pagination with page 1 and size 10
): Promise<ActionResult<PageableResult<T>>> => {
  // Validate query
  const queryValidation = querySchema.safeParse({ filters });
  if (!queryValidation.success) {
    return {
      ok: false,
      status: "system_error",
      message: `Invalid query ${queryValidation.error.errors}`,
    };
  }

  // Validate pagination
  const paginationValidation = paginationSchema.safeParse(pagination);
  if (!paginationValidation.success) {
    return {
      ok: false,
      status: "system_error",
      message: `Invalid pagination ${paginationValidation.error.errors}`,
    };
  }

  // Build pagination URL parameters
  const queryParams = new URLSearchParams({
    page: pagination.page.toString(),
    size: pagination.size.toString(),
    ...pagination.sort?.reduce(
      (acc, sort) => {
        acc[`sort`] = `${sort.field},${sort.direction}`;
        return acc;
      },
      {} as { [key: string]: string },
    ),
  });

  // Send POST request with filters and pagination
  return fetchData(
    `${url}?${queryParams.toString()}`,
    "POST",
    buildSearchQuery(filters),
  );
};
