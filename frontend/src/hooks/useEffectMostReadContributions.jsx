import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import apiConfig from "../configs/api.config";
import { usePushNoti } from "../components/Noti/NotiSystem";

export default function useEffectMostReadContributions() {
    let pushNoti = usePushNoti()
    let token = useAuthContext()

    let [contributions, setContributions] = useState([])

    useEffect(() => {
        let aborter = new AbortController()

        async function getData() {
            try {
                let response = await fetch(apiConfig.path.statistics.mostReadContributions(), {
                    method: 'GET',
                    signal: aborter.signal,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Accept": "application/json"
                    }
                })

                let json = await response.json()
                console.log(json.data)
                if (response.status === 200) {
                    setContributions(json.data)
                } else {
                    pushNoti({
                        title: "Most Read Articles",
                        message: `${json.message} (status: ${response.status})`,
                        style: 'danger'
                    })
                }
                
            } catch (e) {
                console.log("Error while fetching read contributions")
                console.log(e)
                if (e.name !== 'AbortError') {
                    pushNoti({
                        title: "Most Read Articles",
                        message: `${e})`,
                        style: 'danger'
                    })
                }
                console.error(e)
            }
        }

        if (token) getData()

        return () => aborter.abort()
    }, [token])

    return contributions

}