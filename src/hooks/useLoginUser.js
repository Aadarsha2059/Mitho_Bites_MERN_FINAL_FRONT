import { useMutation } from "@tanstack/react-query";
import { loginUserService } from "../services/authService"

import { toast } from "react-toastify";

import { useContext } from "react";
import { AuthContext } from "../auth/authProvider";


export const useLoginUser = () => {
    const { login } = useContext(AuthContext)

    return useMutation(
        {
            mutationFn: loginUserService,
            mutationKey: ["login_key"],
            onSuccess: (data) => { //data-> body
                console.log('Login response:', data);
                // The backend returns { user, token }, not { data, token }
                login(data?.user, data?.token)
                toast.success(data?.message || "login success")
            },
            onError: (err) => {
                console.error('Login error:', err);
                toast.error(err?.message || "login failed")
            }
        }
    )
}