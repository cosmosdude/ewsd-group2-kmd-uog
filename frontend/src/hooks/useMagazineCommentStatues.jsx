import { useContext, useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import apiConfig from "../configs/api.config";

export default function useMagazineCommentStatues(magazineId) {

    let token = useAuthContext()
    console.log("[Auth Context]", token)
    // if (!accessToken) accessToken = token
    let accessToken = token

    let [statuses, setStatuses] = useState({})

    useEffect(() => {
        let aborter = new AbortController()

        async function getData() {
            try {
                let response = await fetch(apiConfig.path.statistics.contributionCommentCount(magazineId), {
                    signal: aborter.signal,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        accept: 'application/json'
                    }
                })

                
                if (response.status === 200) {
                    let json = await response.json()
                    console.log(json.data)
                    setStatuses(json.data)
                }
                
            } catch (e) {
                console.log("Error while fetching user data")
                console.log(e)
            }
        }

        if (accessToken) getData()

        return () => aborter.abort()
    }, [accessToken, magazineId])

    return statuses
}