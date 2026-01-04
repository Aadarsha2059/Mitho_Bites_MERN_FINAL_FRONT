import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfileService } from "../services/authService";
import { toast } from "react-toastify";

export const useUpdateProfile = (user, setUser) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formData) => updateUserProfileService(null, formData),
        mutationKey: ["update_profile"],
        onSuccess: (data, _variables, context) => {
            console.log('Profile update response:', data);
            // Update the user data in context and localStorage
            if (data.user) {
                const updatedUser = {
                    ...user,
                    ...data.user
                };
                if (typeof setUser === 'function') {
                    setUser(updatedUser);
                } else {
                    console.warn('setUser is not a function:', setUser);
                }
                localStorage.setItem('user', JSON.stringify(updatedUser));
            }
            toast.success(data.message || "Profile updated successfully! 🎉");
            queryClient.invalidateQueries(["user_profile"]);
        },
        onError: (err, _variables, context) => {
            console.error('Profile update error:', err);
            toast.error(err.message || "Failed to update profile");
            // If the mutation was called with an onError callback, call it
            if (context && typeof context.onError === 'function') {
                context.onError(err);
            }
        },
    });
}; 
