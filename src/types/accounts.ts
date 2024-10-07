import { z } from "zod";

export const accountSchema = z.object({
  id: z.number().nullish(),
  name: z.string().min(1),
  type: z.string().min(1),
  industry: z.string().min(1),
  email: z.string().email().nullish(),
  addressLine1: z.string().nullish(),
  addressLine2: z.string().nullish(),
  city: z.string().nullish(),
  status: z.string().min(1),
  postalCode: z.string().nullish(),
  country: z.string().nullish(),
  phoneNumber: z.string().nullish(),
  website: z.union([z.string().url(), z.string().length(0)]).optional(),
  annualRevenue: z.string().nullish(),
  createdAt: z.string().nullish(),
  updatedAt: z.string().nullish(),
  notes: z.string().nullish(),
});

export type AccountType = z.infer<typeof accountSchema>;

export const accountSearchParamsSchema = z.object({
  page: z.coerce.number().default(1), // page number
  size: z.coerce.number().default(10), // size per page
  sort: z.string().optional(),
  name: z.string().optional(),
  status: z.string().optional(),
  industry: z.string().optional(),
  type: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
});

export type AccountSearchParams = z.infer<typeof accountSearchParamsSchema>;
