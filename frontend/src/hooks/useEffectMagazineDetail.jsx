import { useContext, useEffect, useState } from "react"
import AuthContext from "../contexts/AuthContext";
import apiConfig from "../configs/api.config";

/**
 * @note 
 * Requires auth context to be valid.
 * */
function useEffectMagazineDetail(magazineId, dependencies = undefined) {
    if (!dependencies) dependencies = []
    dependencies.push(magazineId)

    let accessToken = useContext(AuthContext)
    let [magazine, setMagazine] = useState({});

    useEffect(() => {
        // To handle abortion
        let aborter = new AbortController()

        async function fetchData() {
            try {
                let response = await fetch(apiConfig.path.magazineDetail(magazineId), {
                    signal: aborter.signal,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Accept': 'application/json'
                    }
                })
    
                let json = await response.json()
                if (response.status === 200) {
                    let results = json.data 
                    setMagazine(results)
                }
            } catch { }
        }
        // fetch async
        fetchData()
        // clean up by aborting the request
        return () => { aborter.abort() }
    }, dependencies)

    return [magazine, setMagazine]
}

export default useEffectMagazineDetail;