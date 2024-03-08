import { useContext, useEffect, useState } from "react"
import AuthContext from "../contexts/AuthContext"


// Fetch faculties for once.
//
// Returns an array with exactly 2 elements
// First items is the faculty list
// Second item is error encountered while fetching faculties
function useEffectAllFaculties() {
    
    let [faculties, setFaculties] = useState([])
    let [error, setError] = useState(null)
    // let accessToken = useContext(AuthContext)

    useEffect(() => {
        // abortion controller
        let aborter = new AbortController()

        let headers = { 'Accepts': 'application/json' }
        // if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`

        async function fetchData() {
            try {
                let response = await fetch('http://127.0.0.1:8000/api/faculties', {
                    signal: aborter.signal,
                    headers: headers
                })

                let json = await response.json()
                if (response.status === 200) {
                    // capture the response payload
                    setFaculties(json.data)
                } else {
                    setError("Unable to get faculty list.")
                }

                console.log(json)
                
            } catch (error) {
                setError(`Unable to get faculty list. ${error}`)
                console.log(error)
            }
        }

        // fetch data
        fetchData()
        // upon tear down, cancel the fetch
        return () => aborter.abort()
    }, [])

    return [faculties, error]
}

export default useEffectAllFaculties