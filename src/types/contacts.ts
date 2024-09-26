import { z } from "zod";

import { accountSchema } from "@/types/accounts";

export const contactSchema = z.object({
  id: z.number().nullish(),
  account: accountSchema,
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email().nullish(),
  address: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  postalCode: z.string().nullish(),
  country: z.string().nullish(),
  phoneNumber: z.string().nullish(),
  position: z.string().nullish(),
  createdAt: z.string().nullish(),
  updatedAt: z.string().nullish(),
  status: z.string().min(1),
  notes: z.string().nullish(),
});

export type ContactType = z.infer<typeof contactSchema>;
