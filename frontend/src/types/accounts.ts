import { z } from "zod";

// export interface Account {
//     id?: number;
//     accountName?: string;
//     accountType?: string;
//     industry?: string;
//     website?: string;
//     phoneNumber?: string;
//     email?: string;
//     addressLine1?: string;
//     addressLine2?: string;
//     city?: string;
//     status?: string;
//     postalCode?: string;
//     country?: string;
//     annualRevenue?: number;
//     numberOfEmployees?: number;
//     createdAt?: string;
//     updatedAt?: string;
//     notes?: string;
// }

export const accountSchema = z.object({
  id: z.number().nullish(),
  accountName: z.string().min(1),
  accountType: z.string().min(1),
  industry: z.string().min(1),
  email: z.string().nullish(),
  addressLine1: z.string().min(1),
  addressLine2: z.string().nullish(),
  city: z.string().min(1),
  status: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().nullish(),
  phoneNumber: z.string().nullish(),
  website: z.union([z.string().url(), z.string().length(0)]).optional(),
  annualRevenue: z.string().nullish(),
  createdAt: z.string().nullish(),
  updatedAt: z.string().nullish(),
  notes: z.string().nullish(),
});

export type AccountType = z.infer<typeof accountSchema>;
