import { useMutation } from "@tanstack/react-query";
import { loginUserService } from "../services/authService"

import { toast } from "react-toastify";

import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";


export const useLoginUser = () => {
    return useMutation(
        {
            mutationFn: loginUserService,
            mutationKey: ["login_key"],
            onSuccess: (data) => { //data-> body
                console.log('useLoginUser - Login response:', data);
                // LoginForm handles the actual login call
                // Just log success here
            },
            onError: (err) => {
                console.error('useLoginUser - Login error:', err);
                toast.error(err?.message || "Login failed")
            }
        }
    )
}
