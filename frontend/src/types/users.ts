import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
});

export type UserType = z.infer<typeof userSchema>;
