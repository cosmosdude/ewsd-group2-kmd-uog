import { useContext, useEffect, useState } from "react"
import AuthContext from "../contexts/AuthContext"


// Fetch academic years for once.
//
// Returns an array with exactly 2 elements
// First items is the academic year list
// Second item is error encountered during the fetch.
function useEffectAllAcademicYears() {
    
    let [academicYears, setAcademicYears] = useState([])
    let [error, setError] = useState(null)
    let accessToken = useContext(AuthContext)

    useEffect(() => {
        // abortion controller
        let aborter = new AbortController()

        let headers = { 'Accepts': 'application/json' }
        if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`

        async function fetchData() {
            try {
                let response = await fetch('http://127.0.0.1:8000/api/academic-years', {
                    signal: aborter.signal,
                    headers: headers
                })

                let json = await response.json()
                if (response.status === 200) {
                    // capture the response payload
                    setAcademicYears(json.data.data)
                } else {
                    setError("Unable to get faculty list.")
                }
                
            } catch (error) {
                setError(`Unable to get faculty list. ${error}`)
            }
        }

        // fetch data
        fetchData()
        // upon tear down, cancel the fetch
        return () => aborter.abort()
    }, [])

    return [academicYears, error]
}

export default useEffectAllAcademicYears