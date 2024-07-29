type RefreshTokenResponse = {
    token: string | null;
    tokenExpiry: number;
};

const inMemoryJWTManager = () => {
    let inMemoryJWT: string | null = null;
    let isRefreshing: Promise<boolean> | null = null;
    let logoutEventName = 'ra-logout';
    let refreshEndpoint = '/refresh-token';
    let refreshTimeOutId: number | undefined;

    const setLogoutEventName = (name: string) => logoutEventName = name;
    const setRefreshTokenEndpoint = (endpoint: string) => refreshEndpoint = endpoint;

    const refreshToken = (delay: number) => {
        refreshTimeOutId = window.setTimeout(getRefreshedToken, delay * 1000 - 5000);
    };

    const abortRefreshToken = () => {
        if (refreshTimeOutId) {
            window.clearTimeout(refreshTimeOutId);
        }
    };

    const waitForTokenRefresh = async (): Promise<void> => {
        if (!isRefreshing) {
            return Promise.resolve();
        }
        await isRefreshing;
        isRefreshing = null;
    };

    const getRefreshedToken = (): Promise<boolean> => {
        const request = new Request(refreshEndpoint, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            credentials: 'include',
        });
        isRefreshing = fetch(request)
            .then((response) => {
                if (response.status !== 200) {
                    eraseToken();
                    global.console.log('Token renewal failure');
                    return { token: null } as RefreshTokenResponse;
                }
                return response.json() as Promise<RefreshTokenResponse>;
            })
            .then(({ token, tokenExpiry }) => {
                if (token) {
                    setToken(token, tokenExpiry);
                    return true;
                }
                eraseToken();
                return false;
            });
        return isRefreshing;
    };

    const getToken = (): string | null => inMemoryJWT;

    const setToken = (token: string, delay: number): boolean => {
        inMemoryJWT = token;
        refreshToken(delay);
        return true;
    };

    const eraseToken = (): boolean => {
        inMemoryJWT = null;
        abortRefreshToken();
        window.localStorage.setItem(logoutEventName, Date.now().toString());
        return true;
    };

    window.addEventListener('storage', (event) => {
        if (event.key === logoutEventName) {
            inMemoryJWT = null;
        }
    });

    return {
        eraseToken,
        getRefreshedToken,
        getToken,
        setLogoutEventName,
        setRefreshTokenEndpoint,
        setToken,
        waitForTokenRefresh,
    };
};

export default inMemoryJWTManager();