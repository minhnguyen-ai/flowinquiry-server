import axios, {Axios, AxiosResponse} from 'axios';
import {BACKEND_API} from "./constants";

export default async function apiAuthSignIn(credentials: Record<"email" | "password", string> | undefined) {
    try {
        const response = await axios.post(`${BACKEND_API}/api/login`, JSON.stringify(credentials), {
            headers: {
                "Content-Type": "application/json",
            }
        }).catch((error: AxiosResponse) => {
                console.log(error);
            })


        //verify jwt access token

        const bearerToken = response?.headers?.authorization;
        const jwt = (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') ? bearerToken.slice(7, bearerToken.length) : "";

        const remoteUser = response.data;
        return {...remoteUser, "accessToken": jwt};
    } catch (error) {
        console.log(error);
        return {error: error};
    }
}