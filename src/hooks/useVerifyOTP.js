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
      login(data?.user, data?.token);
      toast.success("Login successful! Welcome to BHOKBHOJ! 🎉");
    },
    onError: (err) => {
      console.error('OTP verification error:', err);
      toast.error(err?.message || "Invalid OTP. Please try again.");
    }
  });
};
