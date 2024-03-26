import { createContext, useContext } from "react";
import { useAuthState } from "../hooks/AuthToken/AuthToken";

// const AuthContext = createContext(null)

// export default AuthContext

// export function useAuthContext() {
//     return useAuthContext()
// }

export function useAuthContext() {
    return useAuthState()[0]
}