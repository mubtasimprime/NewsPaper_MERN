import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [{ index: true, Component: Home }, {}, {}],
  },
  {
    path: "auth",
    element: <AuthLayout></AuthLayout>,
    children: [{ path: "/auth/login", element: <Login></Login> }, {}],
  },
]);
