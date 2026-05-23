export const tokenHelper = {
  set: (token: string) => {
    const expiry = Date.now() + 15 * 60 * 1000;
    localStorage.setItem('accessToken', token);
    localStorage.setItem('accessTokenExpiry', expiry.toString());
  },
  get: () => {
    const token = localStorage.getItem('accessToken');
    const expiry = localStorage.getItem('accessTokenExpiry');
    if (!token || !expiry) return null;
    if (Date.now() > parseInt(expiry)) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('accessTokenExpiry');
      return null;
    }
    return token;
  },
  clear: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenExpiry');
  },
};
