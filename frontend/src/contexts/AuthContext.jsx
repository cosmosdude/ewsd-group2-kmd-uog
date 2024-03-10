import { createContext, useContext } from "react";

const AuthContext = createContext(null)

export default AuthContext

export function useAuthContext() {
    return useContext(AuthContext)
}