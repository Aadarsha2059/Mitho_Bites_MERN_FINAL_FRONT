import { useMutation } from "@tanstack/react-query";
import { resetPasswordService } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useResetPassword = () => {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: resetPasswordService,
    mutationKey: ['resetPassword'],
    onSuccess: (data) => {
      console.log('Password reset success:', data);
      toast.success("Password reset successfully! You can now login with your new password.");
      navigate('/login');
    },
    onError: (err) => {
      console.log("Password reset error:", err);
      toast.error(err.message || "Failed to reset password. Please try again.");
    }
  });
}; 
