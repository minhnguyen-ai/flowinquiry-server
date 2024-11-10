import { z } from "zod";

export const authoritySchema = z
  .object({
    name: z.string().nullish(),
    descriptiveName: z.string().min(1),
    systemRole: z.boolean().default(false),
    description: z.string().optional(),
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

export const authorityResourcePermissionSchema = z.object({
  authorityName: z.string().nullish(),
  resourceName: z.string().nullish(),
  permission: z.string().nullish(),
});

export type AuthorityResourcePermissionType = z.infer<
  typeof authorityResourcePermissionSchema
>;
