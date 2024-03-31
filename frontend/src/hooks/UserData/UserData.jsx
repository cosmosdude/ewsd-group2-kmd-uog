import { createContext, useContext, useEffect, useState } from "react"
import useEffectUserDetail from "../useEffectUserDetail"
import { useAuthContext } from "../../contexts/AuthContext"
import apiConfig from "../../configs/api.config"

let UserContext = createContext({})

export default function UserData({children}) {
    // let user = useEffectUserDetail()

    let token = useAuthContext()

    let [user, setUser] = useState({})

    console.error("user", user)

    useEffect(() => {
        let aborter = new AbortController()

        async function getData() {
            try {
                let response = await fetch(apiConfig.path.me(), {
                    signal: aborter.signal,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        accept: 'application/json'
                    }
                })

                let json = await response.json()
                console.log("FUCKING USER", json.data)
                if (response.status === 200) {
                    setUser(json.data)
                }
                
            } catch (e) {
                console.error("Error while fetching user data")
                console.error(e)
            }
        }

        if (token) getData()

        return () => aborter.abort()
    }, [token])

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
        // <UserContext.Provider value={user}>
        //     {children}
        // <UserContext.Provider/>
    )
}

export function useUserContext() {
    return useContext(UserContext)
}