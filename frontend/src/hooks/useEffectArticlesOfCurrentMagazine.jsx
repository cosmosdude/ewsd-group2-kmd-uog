import { useContext, useEffect, useState } from "react"
import AuthContext from "../contexts/AuthContext"
import apiConfig from "../configs/api.config"

function useEffectArticlesOfCurrentMagazine({magazineId = "", status = ""}) {
    let accessToken = useContext(AuthContext)
    let [articles, setArticles] = useState([])
    console.log("useEffectArticlesOfCurrentMagazine")
    useEffect(() => {
        // To handle abortion
        let aborter = new AbortController()
        let f = new FormData()
        f.append('closure_id', magazineId)
        f.append('status', status)
        console.log("Form", f)
        async function fetchData() {
            try {
                let response = await fetch(apiConfig.path.articlesOfCurrentMagazine(), {
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
    }, [magazineId, status]) // [] is required to ensure single call

    return articles
}

export default useEffectArticlesOfCurrentMagazine;