import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DonationRequest from "../pages/DonationRequest";
import Blog from "../pages/Blog";
import Funding from "../pages/Funding";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import UserProfile from "../pages/UserProfile";
import Dashboard from "../pages/Dashboard/DashBoard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import ErrorLayout from "../layout/ErrorLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorLayout></ErrorLayout>,
    children: [
      { index: true, Component: Home },
      {
        path: "/donation-request",
        element: <DonationRequest></DonationRequest>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/funding",
        element: <Funding></Funding>,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    errorElement: <ErrorLayout></ErrorLayout>,
    children: [
      { path: "/auth/login", element: <Login></Login> },
      { path: "/auth/register", element: <Register></Register> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "all-users",
        element: <AdminDashboard />,
      },
    ],
  },
]);
