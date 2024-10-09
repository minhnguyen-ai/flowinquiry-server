import { z } from "zod";

export const contactSchema = z.object({
  id: z.number().nullish(),
  accountId: z.number().nullish(),
  accountName: z.string().nullish(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email().nullish(),
  address: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  postalCode: z.string().nullish(),
  country: z.string().nullish(),
  phoneNumber: z.string().nullish(),
  position: z.string().nullish(),
  createdAt: z.string().nullish(),
  updatedAt: z.string().nullish(),
  status: z.string().min(1),
  notes: z.string().nullish(),
});

export type ContactType = z.infer<typeof contactSchema>;

export const contactSearchParamsSchema = z.object({
  page: z.coerce.number().default(1), // page number
  size: z.coerce.number().default(10), // size per page
  sort: z.string().optional(),
  name: z.string().optional(),
  status: z.string().optional(),
  accountId: z.onumber(),
  operator: z.enum(["and", "or"]).optional(),
});

export type ContactSearchParams = z.infer<typeof contactSearchParamsSchema>;
