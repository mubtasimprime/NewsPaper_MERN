import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import AuthLayout from "../layout/AuthLayout";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/DashBoard";
import ErrorLayout from "../layout/ErrorLayout";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import AllUsers from "../pages/Dashboard/AllUsers";
import AllArticles from "../pages/Dashboard/AllArticles";
import AddArticle from "../pages/AddArticle";
import AddPublisher from "../pages/Dashboard/AddPublisher";
import Profile from "../pages/Profile";
import Subscription from "../pages/Subscription";
import Payment from "../pages/Payment";
import AllArticlesPublic from "../pages/AllArticlesPublic";
import ArticleDetails from "../pages/ArticleDetails";
import PremiumArticles from "../pages/PremiumArticles";
import MyArticles from "../pages/MyArticles";
import UpdateArticle from "../pages/UpdateArticle";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorLayout></ErrorLayout>,
    children: [
      { index: true, Component: Home },
      {
        path: "/add-article",
        element: (
          <PrivateRoute>
            <AddArticle></AddArticle>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-articles",
        element: <AllArticlesPublic></AllArticlesPublic>,
      },
      {
        path: "/article-details/:id",
        element: (
          <PrivateRoute>
            <ArticleDetails></ArticleDetails>
          </PrivateRoute>
        ),
      },

      {
        path: "/subscription",
        element: (
          <PrivateRoute>
            <Subscription></Subscription>
          </PrivateRoute>
        ),
      },
      {
        path: "/subscription/payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "/premium-article",
        element: (
          <PrivateRoute>
            <PremiumArticles></PremiumArticles>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-articles",
        element: (
          <PrivateRoute>
            <MyArticles></MyArticles>
          </PrivateRoute>
        ),
      },
      {
        path: `/articles/update/:id`,
        element: <UpdateArticle></UpdateArticle>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },

  // Authentication
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    errorElement: <ErrorLayout></ErrorLayout>,
    children: [
      { path: "/auth/login", element: <Login></Login> },
      { path: "/auth/register", element: <Register></Register> },
    ],
  },

  // Dashboard
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
        path: "/dashboard/users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "/dashboard/articles",
        element: <AllArticles></AllArticles>,
      },
      {
        path: "/dashboard/add-publisher",
        element: <AddPublisher></AddPublisher>,
      },
    ],
  },
]);
