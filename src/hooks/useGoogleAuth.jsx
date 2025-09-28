import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "./useAuth";
import { toast } from "react-toastify";

const useGoogleAuth = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const handleGoogleAuth = async () => {
    try {
      const { user } = await signInWithGoogle();
      const now = new Date().toISOString();

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${user.email}`
        );

        if (!data) {
          await axios.post(`${import.meta.env.VITE_API_URL}/add-user`, {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            role: "user",
            createdAt: now,
            lastLoggedIn: now,
          });
        } else {
          //update last login
          await axios.patch(
            `${import.meta.env.VITE_API_URL}/users/${user.email}`,
            { lastLoggedIn: now }
          );
        }
      } catch (dbErr) {
        console.error("DB update failed:", dbErr);
      }

      toast.success("Signed in with Google");
      navigate(from);
    } catch (authErr) {
      // Only real sign-in errors come here
      console.error("Google sign-in failed:", authErr);
      toast.error("Google sign-in failed. Try again.");
    }
  };

  return handleGoogleAuth;
};

export default useGoogleAuth;
