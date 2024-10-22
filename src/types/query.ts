import { z } from "zod";

export type Operator = "gt" | "lt" | "eq" | "in";

// Generic filter that adapts to the object's type (T)
export type Filter<T> = {
  field: keyof T; // Restrict fields to keys of the object type
  operator: Operator;
  value: T[keyof T] | T[keyof T][]; // Value is based on the type of the field
};

export type QueryDTO<T> = {
  filters: Filter<T>[];
};

// Pagination type for handling pagination and sorting
export type Pagination = {
  page: number;
  size: number;
  sort?: { field: string; direction: "asc" | "desc" }[];
};

// Zod schema for filters
export const filterSchema = z.object({
  field: z.string().min(1),
  operator: z.enum(["gt", "lt", "eq", "in"]),
  value: z.union([
    z.string(),
    z.number(),
    z.array(z.string()),
    z.array(z.number()),
  ]),
});

// Zod schema for query with filters
export const querySchema = z.object({
  filters: z.array(filterSchema),
});

// Zod schema for pagination
export const paginationSchema = z.object({
  page: z.number().min(1),
  size: z.number().min(1),
  sort: z
    .array(
      z.object({
        field: z.string().min(1),
        direction: z.enum(["asc", "desc"]),
      }),
    )
    .optional(),
});

// Function to build a dynamic search query with strong types
export const buildSearchQuery = <T>(filters: Filter<T>[]): QueryDTO<T> => {
  return {
    filters,
  };
};
