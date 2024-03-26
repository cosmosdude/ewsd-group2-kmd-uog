import { createContext } from "react";

const AuthStateContext = createContext([null, function(){}])

export default AuthStateContext