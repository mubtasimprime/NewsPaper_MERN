import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function useRole() {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {
      axiosSecure(`/get-user-role?email=${user.email}`)
        .then((res) => {
          // console.log("Fetched role:", res.data.role);
          setRole(res.data.role);
        })
        .catch((err) => {
          console.error("Failed to get role:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [user?.email]);

  return { role, loading };
}
