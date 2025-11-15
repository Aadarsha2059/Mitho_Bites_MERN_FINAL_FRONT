import { useMutation } from "@tanstack/react-query";
import { forgotPasswordService } from "../services/authService";
import { toast } from "react-toastify";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordService,
    mutationKey: ['forgotPassword'],
    onSuccess: (data) => {
      console.log('Forgot password success:', data);
      
      // For testing: show the reset URL if available
      if (data.resetUrl) {
        toast.success("Password reset link generated! Check the console for the reset URL.");
        console.log('Reset URL:', data.resetUrl);
      } else {
        toast.success("Password reset link sent! Please check your email.");
      }
    },
    onError: (err) => {
      console.log("Forgot password error:", err);
      // Don't show toast for email not found - let the component handle it with modal
      if (!err.emailNotFound) {
        toast.error(err.message || "Failed to send reset email. Please try again.");
      }
    }
  });
}; 
