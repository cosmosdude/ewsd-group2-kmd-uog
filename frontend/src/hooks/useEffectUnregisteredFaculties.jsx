import { useContext, useEffect, useState } from "react"

import apiConfig from "../configs/api.config"
import { usePushNoti } from "../components/Noti/NotiSystem"
import { useAuthContext } from "../contexts/AuthContext"


// Fetch faculties for once.
//
// Returns an array with exactly 2 elements
// First items is the faculty list
// Second item is error encountered while fetching faculties
export default function useEffectUnregisteredFaculties() {
    
    let pushNoti = usePushNoti()

    let [faculties, setFaculties] = useState([])
    let accessToken = useAuthContext()

    useEffect(() => {
        // abortion controller
        let aborter = new AbortController()

        let headers = { 'accept': 'application/json' }
        if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`

        async function fetchData() {
            try {

                let allFaculties = []
                let unregisteredIds = []
                {
                    let response = await fetch(apiConfig.path.faculties(), {
                        signal: aborter.signal,
                        headers: headers
                    })
    
                    let json = await response.json()
                    if (response.status === 200) {
                        // capture the response payload
                        // setFaculties(json.data)
                        allFaculties = json.data
                    } else {
                        pushNoti({
                            title: "Error",
                            message: `Unable to get faculties. ${json.message} (status: ${response.status})`,
                            style: 'danger'
                        })
                    }
    
                    console.log(json)
                }

                {
                    let response = await fetch(apiConfig.path.unregisteredFacultiesIdsForGuest(), {
                        signal: aborter.signal,
                        headers: headers
                    })
    
                    let json = await response.json()
                    if (response.status === 200) {
                        // capture the response payload
                        // setFaculties(json.data)
                        unregisteredIds = json.data.filter(x => x !== 1)
                        console.log("IDS", unregisteredIds)
                    } else {
                        pushNoti({
                            title: "Error",
                            message: `Unable to get faculties. ${json.message} (status: ${response.status})`,
                            style: 'danger'
                        })
                    }
    
                    console.log(json)
                }
                
                setFaculties(allFaculties.filter(x => unregisteredIds.includes(x.id)))
                
            } catch (error) {
                console.log(error)
            }
        }

        // fetch data
        fetchData()
        // upon tear down, cancel the fetch
        return () => aborter.abort()
    }, [])

    return faculties
}