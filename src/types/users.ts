import { z } from "zod";

import { authoritySchema } from "@/types/authorities";

export const userSchema = z.object({
  id: z.number().nullish(),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().nullish(),
  timezone: z.string().nullish(),
  lastLoginTime: z.string().nullish(),
  authorities: z
    .array(z.union([authoritySchema, z.string()]))
    .transform((authorities) =>
      authorities.map((auth) =>
        typeof auth === "string"
          ? { name: auth, descriptiveName: auth, systemRole: false }
          : auth,
      ),
    ),
});

export type UserType = z.infer<typeof userSchema>;

export const userSearchParamsSchema = z.object({
  page: z.coerce.number().default(1).optional(), // page number
  size: z.coerce.number().default(10).optional(), // size per page
  sort: z.string().optional(),
  name: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
});

export type UserSearchParams = z.infer<typeof userSearchParamsSchema>;
