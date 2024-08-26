import { z } from "zod";

export interface Account {
  id?: number;
  accountName?: string;
  accountType?: string;
  industry?: string;
  website?: string;
  phoneNumber?: string;
  email?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  annualRevenue?: number;
  numberOfEmployees?: number;
  createdAt?: string;
  updatedAt?: string;
  notes?: string;
}

export const accountSchema = z.object({
  id: z.number().optional(),
  accountName: z.string().min(1),
  accountType: z.string().min(1),
  industry: z.string().min(1),
  addressLine1: z.string().min(1),
  addressLine2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(1),
  phoneNumber: z.string().optional(),
  website: z.string().url({ message: "Invalid url" }).optional(),
  status: z.string().min(1),
});

export type AccountType = z.infer<typeof accountSchema>;
