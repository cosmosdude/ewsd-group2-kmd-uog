import { useContext, useEffect, useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import apiConfig from "../configs/api.config"


// Fetch academic years for once.
//
// Returns an array with exactly 2 elements
// First items is the academic year list
// Second item is error encountered during the fetch.
function useContributionsAndContributorsCount(academicYearId) {
    
    let [contributions, setContributions] = useState([])
    let accessToken = useAuthContext()

    useEffect(() => {
        // abortion controller
        let aborter = new AbortController()

        let headers = { 'Accepts': 'application/json' }
        if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`

        async function fetchData() {
            try {
                let response = await fetch(apiConfig.path.statistics.contributionsAndContributors(academicYearId), {
                    signal: aborter.signal,
                    headers: headers
                })

                let json = await response.json()
                if (response.status === 200) {
                    // capture the response payload
                    setContributions(json.data)
                } else {
                    console.error(json.message)
                }
                
            } catch (error) {
                console.error(error)
            }
        }

        // fetch data
        fetchData()
        // upon tear down, cancel the fetch
        return () => aborter.abort()
    }, [accessToken, academicYearId])

    return contributions
}

export default useContributionsAndContributorsCount