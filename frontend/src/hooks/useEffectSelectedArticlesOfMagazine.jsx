import { useContext, useEffect, useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import apiConfig from "../configs/api.config"

function useEffectSelectedArticlesOfMagazine({magazineId = "", facultyId}) {
    let accessToken = useAuthContext()
    let [articles, setArticles] = useState([])
    console.log("useEffectSelectedArticlesOfMagazine")
    useEffect(() => {
        // To handle abortion
        let aborter = new AbortController()
        let f = new FormData()
        f.set('closure_id', magazineId)
        if (facultyId) f.set('faculty_id', facultyId)
        console.log("Form", f)
        async function fetchData() {
            try {
                let response = await fetch(apiConfig.path.selectedArticles(), {
                    signal: aborter.signal,
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Accept': 'application/json'
                    }, body: f
                })
                console.log('FUCK', response.status)

                setArticles([]) // preemptly set to []
                // console.log(await response.text())
                let json = await response.json()
                console.log('FUCK json', json)
                if (response.status === 200) {
                    let results = json?.data 
                    setArticles(results ?? [])
                    console.log("FUCK Success")
                } else {
                    console.log('FUCK json', json)
                }
            } catch (e) { 
                console.log("FUCK Error", e)
                setArticles([])
            }
        }
        // fetch async
        fetchData()
        // clean up by aborting the request
        return () => { aborter.abort() }
    }, [magazineId, facultyId]) // [] is required to ensure single call

    return articles
}

export default useEffectSelectedArticlesOfMagazine;