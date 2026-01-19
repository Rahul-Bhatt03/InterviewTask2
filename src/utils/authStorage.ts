export const saveAuth = (user: any, token: string) => {
  localStorage.setItem("app_user", JSON.stringify(user));
  localStorage.setItem("app_token", token);
}

export const getAuth = () => ({
  user: JSON.parse(localStorage.getItem("app_user") || "null"),
  token: localStorage.getItem("app_token")
});

export const clearAuth = () => {
  localStorage.removeItem("app_user");
  localStorage.removeItem("app_token");
}
