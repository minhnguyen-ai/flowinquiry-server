import { z } from "zod";

export const organizationSchema = z.object({
  id: z.number().nullish(),
  name: z.string().min(1),
  logoUrl: z.string().default(""),
  slogan: z.string().default(""),
  description: z.string().default(""),
});

export type OrganizationType = z.infer<typeof organizationSchema>;
