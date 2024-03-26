import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import apiConfig from "../configs/api.config";
import { usePushNoti } from "../components/Noti/NotiSystem";

export default function useEffectFacultyGuestAndStudentCounts() {
    let pushNoti = usePushNoti()
    let token = useAuthContext()

    let [counts, setCounts] = useState([])

    useEffect(() => {
        let aborter = new AbortController()

        async function getData() {
            try {
                let response = await fetch(apiConfig.path.statistics.facultyGuestAndStudentCounts(), {
                    signal: aborter.signal,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                })

                let json = await response.json()
                console.log(json.data)
                if (response.status === 200) {
                    setCounts(json.data)
                } else {
                    pushNoti({
                        title: "Most Active Users",
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

    return counts

}