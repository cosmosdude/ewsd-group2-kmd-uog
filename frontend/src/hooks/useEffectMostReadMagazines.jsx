import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import apiConfig from "../configs/api.config";

export default function useEffectMostReadMagazines() {

    let token = useAuthContext()

    let [magazines, setMagazines] = useState([])

    useEffect(() => {
        let aborter = new AbortController()

        async function getData() {
            try {
                let response = await fetch(apiConfig.path.statistics.mostViewedMagazines(), {
                    signal: aborter.signal,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                let json = await response.json()
                console.log(json.data)
                if (response.status === 200) {
                    setMagazines(json.data)
                }
                
            } catch (e) {
                console.log("Error while fetching user data")
                console.log(e)
            }
        }

        if (token) getData()

        return () => aborter.abort()
    }, [token])

    return magazines

}