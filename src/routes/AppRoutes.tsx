import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { PrivateRoute } from "./PrivateRoute";

const Home = lazy(() => import('../pages/Home').then(m => ({ default: m.Home })));
const Login = lazy(() => import("../pages/Login").then(m => ({ default: m.Login })));
const SignUp = lazy(() => import("../pages/SignUp").then(m => ({ default: m.SignUp })));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout />, 
        children: [
          {
            path: "/home",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <Home />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;