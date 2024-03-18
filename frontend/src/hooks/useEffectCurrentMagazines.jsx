import { useContext, useEffect, useState } from "react"
import AuthContext from "../contexts/AuthContext"
import apiConfig from "../configs/api.config"

function useEffectCurrentMagazines() {
    let accessToken = useContext(AuthContext)
    let [magazines, setMagazines] = useState([])

    useEffect(() => {
        // To handle abortion
        let aborter = new AbortController()

        async function fetchData() {
            try {
                let response = await fetch(apiConfig.path.currentMagazines(), {
                    signal: aborter.signal,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Accept': 'application/json'
                    }
                })
                console.log(response.status)
                let json = await response.json()
                if (response.status === 200) {
                    let results = json.data 
                    setMagazines(results)
                    console.log("Success")
                } 
            } catch (e) { 
                console.log("Error", e)
            }
        }
        // fetch async
        fetchData()
        // clean up by aborting the request
        return () => { aborter.abort() }
    }, []) // [] is required to ensure single call

    return magazines
}

export default useEffectCurrentMagazines;