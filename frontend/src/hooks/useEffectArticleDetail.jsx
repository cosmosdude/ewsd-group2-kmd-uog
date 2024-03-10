import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";

export default function useEffectArticleDetail(id) {

    let token = useContext(AuthContext)

    let [data, setData] = useState({})

    useEffect(() => {
        let aborter = new AbortController()

        async function getData() {
            try {
                let response = await fetch(`http://127.0.0.1:8000/api/contributions/${id}`, {
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
    }, [id])

    return data
}