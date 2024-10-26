"use server";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { handleError, HttpError } from "@/lib/errors";
import { PageableResult } from "@/types/commons";
import {
  buildSearchQuery,
  Filter,
  Pagination,
  paginationSchema,
  QueryDTO,
  querySchema,
} from "@/types/query";

export const fetchData = async <TData, TResponse>(
  url: string,
  method: string,
  data?: TData,
): Promise<TResponse> => {
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
    return (await response.json()) as TResponse;
  } else {
    // Unauthorized access
    if (response.status === 401) {
      redirect("/login");
    }
    await handleError(response);

    // Add unreachable return statement for TypeScript type safety
    return Promise.reject("Unreachable code: handleError should throw");
  }
};

export const get = async <TResponse>(url: string): Promise<TResponse> => {
  return fetchData(url, "GET");
};

export const post = async <TData, TResponse>(
  url: string,
  data?: TData,
): Promise<TResponse> => {
  return fetchData(url, "POST", data);
};

export const put = async <TData, TResponse>(
  url: string,
  data?: TData,
): Promise<TResponse> => {
  return fetchData(url, "PUT", data);
};

// Default pagination object
const defaultPagination: Pagination = {
  page: 1,
  size: 10,
};

// Function to send a dynamic search query with pagination and URL
export const doAdvanceSearch = async <R>(
  url: string, // URL is passed as a parameter
  filters: Filter[] = [], // Filters for the search
  pagination: Pagination = defaultPagination, // Default pagination with page 1 and size 10
) => {
  // Validate query
  const queryValidation = querySchema.safeParse({ filters });
  if (!queryValidation.success) {
    throw new HttpError(
      HttpError.BAD_REQUEST,
      `Invalid query ${queryValidation.error.errors}`,
    );
  }

  // Validate pagination
  const paginationValidation = paginationSchema.safeParse(pagination);
  if (!paginationValidation.success) {
    throw new HttpError(
      HttpError.BAD_REQUEST,
      `Invalid pagination ${paginationValidation.error.errors}`,
    );
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

  return fetchData<QueryDTO, PageableResult<R>>(
    `${url}?${queryParams.toString()}`,
    "POST",
    buildSearchQuery(filters),
  );
};
