import { Navigate } from "react-router";
import Loading from "../pages/shared/Loading";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/auth/login" replace />;

  return children;
};

export default PrivateRoute;
