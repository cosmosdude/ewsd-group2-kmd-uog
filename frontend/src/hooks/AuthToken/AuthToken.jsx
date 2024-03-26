import { useContext, useState } from "react";
import AuthStateContext from "./useAuthToken";

function AuthToken({children}) {

    let key = "accessToken"

    let [auth, setAuth] = useState(window.localStorage.getItem(key))

    function updateAuth(newValue) {
        console.log("[AUTH]", newValue)
        setAuth(x => newValue)
        if (!newValue) {
            window.localStorage.removeItem(key)
        } else {
            window.localStorage.setItem(key, newValue)
        }
    }

    return (
        <AuthStateContext.Provider value={[auth, updateAuth]}>
            {children}
        </AuthStateContext.Provider>
    );
}

export default AuthToken;

export function useAuthState() {
    return useContext(AuthStateContext)
}

