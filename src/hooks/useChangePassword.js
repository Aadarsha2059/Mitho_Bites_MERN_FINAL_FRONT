import { useMutation } from "@tanstack/react-query";
import { changePasswordService } from "../services/authService";
import { toast } from "react-toastify";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePasswordService,
    mutationKey: ['changePassword'],
    onSuccess: (data) => {
      console.log('Password changed successfully:', data);
      toast.success("Password changed successfully! 🎉");
    },
    onError: (err) => {
      console.log("Change password error:", err);
      toast.error(err.message || "Failed to change password. Please try again.");
    }
  });
};
