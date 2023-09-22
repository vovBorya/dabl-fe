export const checkIsAuthenticated = (): boolean => {
    return Boolean(localStorage.getItem('accessToken'));
};
