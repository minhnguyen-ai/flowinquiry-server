


export interface Account {
    id: bigint,
    accountName: string,
    accountType: string,
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
    notes?:string
}