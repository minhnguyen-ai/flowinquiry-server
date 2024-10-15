import { z } from "zod";

export const teamSchema = z.object({
  id: z.number().nullish(),
  name: z.string().min(1),
  logoUrl: z.string().nullish(),
  slogan: z.string().nullish(),
  description: z.string().nullish(),
  organizationId: z.number().nullish(),
});

export type TeamType = z.infer<typeof teamSchema>;

export const teamSearchParamsSchema = z.object({
  page: z.coerce.number().default(1).optional(), // page number
  size: z.coerce.number().default(10).optional(), // size per page
  sort: z.string().optional(),
  name: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
});

export type TeamSearchParams = z.infer<typeof teamSearchParamsSchema>;
