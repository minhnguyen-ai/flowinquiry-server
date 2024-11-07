import { z } from "zod";

export const authoritySchema = z
  .object({
    name: z.string().nullish(),
    descriptiveName: z.string().min(1),
    systemRole: z.boolean().default(false),
    description: z.string().nullable().optional(),
  })
  .transform((data) => {
    // If `name` is null, set it to `descriptiveName`
    return {
      ...data,
      name:
        data.name === null || data.name === undefined || data.name === ""
          ? data.descriptiveName
          : data.name,
    };
  });

export type AuthorityType = z.infer<typeof authoritySchema>;

export const authoritySearchParamsSchema = z.object({
  page: z.coerce.number().default(1), // page number
  size: z.coerce.number().default(10), // size per page
  sort: z.string().optional(),
});

export type AuthoritySearchParams = z.infer<typeof authoritySearchParamsSchema>;
