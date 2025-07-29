import { Navigate } from "react-router";
import Loading from "../pages/shared/Loading";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import VolunteerDashboard from "../pages/Dashboard/VolunteerDashboard";
import DonorDashboard from "../pages/Dashboard/DonorDashboard";
import useRole from "../hooks/useRole";

export default function Dashboard() {
  const { role, loading } = useRole();

  if (loading) {
    return <Loading></Loading>;
  }
  console.log("Role is:", role);

  if (role === "donor") {
    return <DonorDashboard></DonorDashboard>;
  }
  if (role === "volunteer") {
    return <VolunteerDashboard></VolunteerDashboard>;
  }

  if (role === "admin") {
    return <AdminDashboard></AdminDashboard>;
  }

  return <Navigate to={"/"} />;
}
