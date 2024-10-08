import { useContext, useState } from "react"
import { AuthRoutes } from "./AuthRoutes"
import AuthContext from "../context/authContext"
import AppRoutes from "./AppRoutes"

export function Routes() {

    const { signed } = useContext(AuthContext)
    
    return signed ? <AppRoutes /> : <AuthRoutes />
}