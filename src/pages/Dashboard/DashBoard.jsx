import { Outlet } from "react-router";
import Loading from "../shared/Loading";

export default function Dashboard() {
  return (
    <>
      <Outlet></Outlet>
    </>
  );
}
