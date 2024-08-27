import { z } from "zod";

export const authoritySchema = z.object({
  name: z.string().min(1),
});

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  timezone: z.string().min(1),
  authorities: z.array(authoritySchema),
});

export type UserType = z.infer<typeof userSchema>;

export type AuthorityType = z.infer<typeof authoritySchema>;
