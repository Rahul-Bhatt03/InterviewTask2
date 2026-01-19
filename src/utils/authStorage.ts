export const saveAuth = (user: any, token: string) => {
  const safeUser = {
    ...user[0],
  };
  delete safeUser.password;
  const allowedFields = ['id', 'name', 'email'];
  const filteredUser: any = {};
  
  allowedFields.forEach(field => {
    if (user[0][field] !== undefined) {
      filteredUser[field] = user[0][field];
    }
  });
  
  localStorage.setItem("app_user", JSON.stringify(filteredUser));
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
