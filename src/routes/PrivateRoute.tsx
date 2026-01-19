import { Navigate, Outlet } from "react-router-dom";
import { getAuth } from "../utils/authStorage";

export const PrivateRoute = () => {
  const { token } = getAuth();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
