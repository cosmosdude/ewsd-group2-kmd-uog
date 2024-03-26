import { useContext, useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import apiConfig from "../configs/api.config";

export default function useEffectUserDetail() {

    let token = useAuthContext()
    console.log("[User Detail]", token)
    // if (!accessToken) accessToken = token
    let accessToken = token

    let [user, setUser] = useState({})

    useEffect(() => {
        let aborter = new AbortController()

        async function getData() {
            try {
                let response = await fetch(apiConfig.path.me(), {
                    signal: aborter.signal,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        accept: 'application/json'
                    }
                })

                let json = await response.json()
                console.log(json.data)
                if (response.status === 200) {
                    setUser(json.data)
                }
                
            } catch (e) {
                console.log("Error while fetching user data")
                console.log(e)
            }
        }

        if (accessToken) getData()

        return () => aborter.abort()
    }, [accessToken])

    return user
}