import {Navigate, Outlet} from "react-router-dom";
import { AuthContext } from "../auth/authProvider";
import { useContext } from "react";

import React from 'react'

export default function GuestRouter() {
    const {user,loading}=useContext(AuthContext)

    if(loading) return <>Loading</>

    if(user) return <Navigate to ="/" />

    return <Outlet/>
}
