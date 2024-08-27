import { z } from "zod";

export const userSchema = z.object({});

export type UserType = z.infer<typeof userSchema>;
