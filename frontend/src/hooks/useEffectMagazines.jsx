import { useContext, useEffect, useState } from "react"
import AuthContext from "../contexts/AuthContext"

function useEffectMagazines() {
    let accessToken = useContext(AuthContext)
    let [magazines, setMagazines] = useState([])

    useEffect(() => {
        // To handle abortion
        let aborter = new AbortController()

        async function fetchData() {
            try {
                let response = await fetch('http://127.0.0.1:8000/api/closures', {
                    signal: aborter.signal,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Accept': 'application/json'
                    }
                })
    
                let json = await response.json()
                if (response.status === 200) {
                    let results = json.data.data 
                    setMagazines(results)
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