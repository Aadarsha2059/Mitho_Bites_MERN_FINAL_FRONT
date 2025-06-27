import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfileService } from "../services/authService";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../auth/authProvider";

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const { user, setUser } = useContext(AuthContext);

    return useMutation({
        mutationFn: (formData) => updateUserProfileService(user?._id, formData),
        mutationKey: ["update_profile"],
        onSuccess: (data) => {
            console.log('Profile update response:', data);
            
            // Update the user data in context and localStorage
            if (data.user) {
                const updatedUser = {
                    ...user,
                    ...data.user
                };
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
            }
            
            toast.success(data.message || "Profile updated successfully! 🎉");
            queryClient.invalidateQueries(["user_profile"]);
        },
        onError: (err) => {
            console.error('Profile update error:', err);
            toast.error(err.message || "Failed to update profile");
        }
    });
}; 