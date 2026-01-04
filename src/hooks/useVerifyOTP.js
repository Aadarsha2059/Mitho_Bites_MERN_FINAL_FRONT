import { useMutation } from "@tanstack/react-query";
import { verifyOTPService } from "../services/authService";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

export const useVerifyOTP = () => {
  const { login } = useContext(AuthContext);

  return useMutation({
    mutationFn: verifyOTPService,
    mutationKey: ['verifyOTP'],
    onSuccess: (data) => {
      console.log('OTP verification successful:', data);
      // Login the user
      if (data?.user && data?.token) {
        login(data.user, data.token);
        toast.success("Login successful! Welcome to BHOKBHOJ! 🎉");
      } else {
        console.error('Missing user or token in OTP verification response:', data);
        toast.error("Login successful but user data missing. Please refresh.");
      }
    },
    onError: (err) => {
      console.error('OTP verification error:', err);
      const errorMessage = err?.response?.data?.message || err?.message || "Invalid OTP. Please try again.";
      toast.error(errorMessage);
    }
  });
};
