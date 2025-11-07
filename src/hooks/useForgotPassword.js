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
        // You can also copy this URL to clipboard or show it in a modal
      } else {
        toast.success("If an account with this email exists, you will receive a password reset link.");
      }
    },
    onError: (err) => {
      console.log("Forgot password error:", err);
      toast.error(err.message || "Failed to send reset email. Please try again.");
    }
  });
}; 
