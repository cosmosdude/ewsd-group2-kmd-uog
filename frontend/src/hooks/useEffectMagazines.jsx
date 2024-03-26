import { useContext, useEffect, useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import apiConfig from "../configs/api.config"

/// Get past magazines
function useEffectMagazines(isPast = true) {
    let accessToken = useAuthContext()
    let [magazines, setMagazines] = useState([])

    useEffect(() => {
        // To handle abortion
        let aborter = new AbortController()

        async function fetchData() {
            try {
                let response = await fetch(apiConfig.path.magazines(), {
                    signal: aborter.signal,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Accept': 'application/json'
                    }
                })
    
                let json = await response.json()
                if (response.status === 200) {
                    let results = json.data.data 
                    setMagazines(
                        isPast 
                        ? results.filter(m => new Date(m.final_closure_date) < new Date())
                        : results
                        )
                }
            } catch { }
        }
        // fetch async
        fetchData()
        // clean up by aborting the request
        return () => { aborter.abort() }
    }, []) // [] is required to ensure single call

    return magazines
}

export default useEffectMagazines;