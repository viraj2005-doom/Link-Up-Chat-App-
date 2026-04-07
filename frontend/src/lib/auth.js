const ACCESS_TOKEN_KEY = "chatapp-access-token";

export const getAccessToken = () => {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setAccessToken = (token) => {
  if (typeof window === "undefined") return;

  if (token) {
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
    return;
  }

  window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
};

export { ACCESS_TOKEN_KEY };
