import { z } from "zod";

export const authoritySchema = z.object({
  name: z.string().min(1),
  descriptiveName: z.string().min(1),
});

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  timezone: z.string().min(1),
  lastLoginTime: z.string().nullish(),
  authorities: z.array(authoritySchema),
});

export type UserType = z.infer<typeof userSchema>;

export type AuthorityType = z.infer<typeof authoritySchema>;

export const userSearchParamsSchema = z.object({
  page: z.coerce.number().default(1).optional(), // page number
  size: z.coerce.number().default(10).optional(), // size per page
  sort: z.string().optional(),
  name: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
});

export type UserSearchParams = z.infer<typeof userSearchParamsSchema>;
