import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../components/layout/Layout";

const Home = lazy(() => import('../pages/Home').then(module => ({ default: module.Home })))
const Login = lazy(() => import("../pages/Login").then(module => ({ default: module.Login })))
const SignUp = lazy(() => import("../pages/SignUp").then(module => ({ default: module.SignUp })))

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <Home />
                    </Suspense>
                )
            },
            {
                path: 'login',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: 'signup',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <SignUp />
                    </Suspense>
                ),
            },
        ]
    }
])

export const AppRouter = () => {
    return <RouterProvider router={router} />
}