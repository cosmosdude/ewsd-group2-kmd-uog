import { useContext, useEffect, useState } from "react"
import apiConfig from "../configs/api.config"
import AuthContext from "../contexts/AuthContext"

function useEffectUploadedContributions() {
    let accessToken = useContext(AuthContext)
    let [contributions, setContributions] = useState([])

    useEffect(() => {
        // To handle abortion
        let aborter = new AbortController()

        async function fetchData() {
            try {
                let response = await fetch(
                    apiConfig.path.uploadedContributions(), {
                    signal: aborter.signal,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Accept': 'application/json'
                    }
                })
    
                let json = await response.json()
                console.log(json)
                if (response.status === 200) {
                    let results = json.data 
                    setContributions(results)
                }
            } catch { }
        }
        // fetch async
        fetchData()
        // clean up by aborting the request
        return () => { aborter.abort() }
    }, []) // [] is required to ensure single call

    return contributions
}

export default useEffectUploadedContributions;