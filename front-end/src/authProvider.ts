import inMemoryJWT from './inMemoryJWT';

interface LoginParams {
    username: string;
    password: string;
}

interface ResponseData {
    token: string;
    tokenExpiry: number;
}

const authProvider = {
    login: async ({username, password}: LoginParams): Promise<boolean> => {
        const request = new Request('http://localhost:8001/authenticate', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: new Headers({'Content-Type': 'application/json'}),
            credentials: 'include',
        });
        inMemoryJWT.setRefreshTokenEndpoint('http://localhost:8001/refresh-token');
        let response = await fetch(request);
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
        }
        let result1: any = await response.json();
        const {token, tokenExpiry} = result1;
        return inMemoryJWT.setToken(token, tokenExpiry);
    },

    logout: async (): Promise<string> => {
        const request = new Request('http://localhost:8001/logout', {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'include',
        });
        inMemoryJWT.eraseToken();
        return fetch(request).then(() => '/login');
    },

    checkAuth: async (): Promise<void> => {
        return inMemoryJWT.waitForTokenRefresh().then(() => {
            return inMemoryJWT.getToken() ? Promise.resolve() : Promise.reject();
        });
    },

    checkError: (error: { status: number }): Promise<void> => {
        const status = error.status;
        if (status === 401 || status === 403) {
            inMemoryJWT.eraseToken();
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getPermissions: async (): Promise<void> => {
        return inMemoryJWT.waitForTokenRefresh().then(() => {
            return inMemoryJWT.getToken() ? Promise.resolve() : Promise.reject();
        });
    },
};

export default authProvider;