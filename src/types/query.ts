import { z } from "zod";

export type Operator = "gt" | "lt" | "eq" | "in" | "lk";

export type Filter = {
  field: string; // Loosely typed field name
  operator: Operator; // Specifies the operator (greater than, less than, etc.)
  value: any; // Loosely typed value, can be a single value or array
};

export type QueryDTO = {
  filters: Filter[]; // Array of Filter objects
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
  operator: z.enum(["gt", "lt", "eq", "in", "lk"]),
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
export const buildSearchQuery = (filters: Filter[]): QueryDTO => {
  return {
    filters,
  };
};
