import {z} from "zod";


export interface Account {
    id?: bigint,
    accountName?: string,
    accountType?: string,
    industry?: string,
    website?: string,
    phoneNumber?: string,
    email?: string,
    addressLine1?: string,
    addressLine2?: string,
    city?: string,
    state?: string,
    postcode?: string,
    country?: string,
    annualRevenue?: number,
    numberOfEmployees?: number,
    createdAt?: string,
    updatedAt?: string,
    notes?: string
}

export const accountSchema = z.object({
    accountName: z.string().min(1),
    accountType: z.string().min(1),
    industry: z.string().min(1),
    website: z.ostring(),
    status: z.string().min(1)
});

export type AccountSchema = z.infer<typeof accountSchema>;