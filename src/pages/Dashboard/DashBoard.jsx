import { Navigate } from "react-router";
import useRole from "../../hooks/useRole";
import Loading from "../shared/Loading";
import DonorDashboard from "./DonorDashboard";
import VolunteerDashboard from "./VolunteerDashboard";
import AdminDashboard from "./AdminDashboard";

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
