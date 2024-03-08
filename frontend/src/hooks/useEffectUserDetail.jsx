import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";

export default function useEffectUserDetail(accessToken = undefined) {

    let token = useContext(AuthContext)

    if (!accessToken) accessToken = token

    let [user, setUser] = useState({})

    useEffect(() => {
        let aborter = new AbortController()

        async function getData() {
            try {
                let response = await fetch('http://127.0.0.1:8000/api/me', {
                    signal: aborter.signal,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })

                let json = await response.json()
                console.log(json.data)
                if (response.status === 200) {
                    setUser(json.data)
                }
                
            } catch (e) {
                console.log("Error while fetching user data")
            }
        }

        if (accessToken) getData()

        return () => aborter.abort()
    }, [accessToken])

    return user
}