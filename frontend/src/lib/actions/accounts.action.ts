"use server";

import {Account, accountSchema} from "@/types/accounts";
import {BACKEND_API} from "@/lib/constants";
import {auth} from "@/auth";

export const getAccounts = async () => {
    try {
        const session = await auth();
        console.log(`Token ${JSON.stringify(session)}`);
        const res = await fetch(
            `${BACKEND_API}/api/accounts`, {
                headers: {
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${session.token}`
                }
            });

        return res.json();

    } catch (error) {
        console.log("Error occurs while getting accounts", error);
    }
}

export const saveAccount = async (formData: FormData) => {
    try {
        const validation = accountSchema.safeParse(Object.fromEntries(formData.entries()))
        if (validation.success) {
            const session = await auth();
            const response = await fetch(`${BACKEND_API}/api/accounts`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${session?.token}`
                },
                body: JSON.stringify(Object.fromEntries(formData.entries())),
            })
            console.log("Save account " + JSON.stringify(Object.fromEntries(formData.entries())) + " . Result " + response.status);
        } else {
            console.log("Form error")
            return {
                errors: validation.error.issues
            }
        }
    } finally {

    }
}