import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import apiConfig from "../configs/api.config";
import { usePushNoti } from "../components/Noti/NotiSystem";

export default function userEffectMostActiveGuestUsers() {
    let pushNoti = usePushNoti()
    let token = useAuthContext()

    let [guestUsers, setGuestUsers] = useState([])

    useEffect(() => {
        let aborter = new AbortController()

        async function getData() {
            try {
                let response = await fetch(apiConfig.path.statistics.mostActiveGuestUsers(), {
                    signal: aborter.signal,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                })

                let json = await response.json()
                console.log(json.data)
                if (response.status === 200) {
                    setGuestUsers(json.data)
                } else {
                    pushNoti({
                        title: "Unable to get Most Active Users",
                        message: `${json.message} (status: ${response.status})`,
                        style: 'danger'
                    })
                }
                
            } catch (e) {
                console.log("Error while fetching user data")
                console.log(e)
            }
        }

        if (token) getData()

        return () => aborter.abort()
    }, [token])

    return guestUsers

}