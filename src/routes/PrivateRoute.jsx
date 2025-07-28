import { Navigate, useLocation } from "react-router";
import Loading from "../pages/shared/Loading";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  // const location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    <Navigate to="/auth/login"></Navigate>;
  }
  return children;
};

export default PrivateRoute;
