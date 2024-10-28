import { z } from "zod";

export const authoritySchema = z
  .object({
    name: z.string().nullable(), // Allow `name` to be null initially
    descriptiveName: z.string().min(1), // Require `descriptiveName` to be a non-empty string
    systemRole: z.boolean().default(false), // Default for `systemRole`
    description: z.string().nullable(),
  })
  .transform((data) => {
    // If `name` is null, set it to `descriptiveName`
    return {
      ...data,
      name:
        data.name === null || data.name === ""
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
