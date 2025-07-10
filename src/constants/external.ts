export const CONSTANTS = {
  DASHBOARD_BACKEND:
    import.meta.env.VITE_DASHBOARD_BACKEND || "http://localhost:3000/api/",
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || "http://localhost:3000",
  LOGIN_ENDPOINT: "auth/login",
  AUTH_METHOD: "Bearer",
};
