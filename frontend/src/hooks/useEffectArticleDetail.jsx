import { useContext, useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import apiConfig from "../configs/api.config";

export default function useEffectArticleDetail(id, dependencies = []) {

    let token = useAuthContext()

    let [data, setData] = useState({})

    useEffect(() => {
        let aborter = new AbortController()

        async function getData() {
            try {
                let response = await fetch(apiConfig.path.articleDetail(id), {
                    signal: aborter.signal,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                let json = await response.json()
                console.log(json.data)
                if (response.status === 200) {
                    // json.data.comments = [10, 20]
                    setData(json.data)
                }
                
            } catch (e) {
                console.log("Error while fetching user data")
            }
        }

        if (token) getData()

        return () => aborter.abort()
    }, [id, ...dependencies])

    return data
}