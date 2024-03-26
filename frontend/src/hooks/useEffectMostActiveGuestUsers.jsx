import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import apiConfig from "../configs/api.config";

export default function userEffectMostActiveGuestUsers() {

    let token = useAuthContext()

    let [guestUsers, setGuestUsers] = useState([])

    useEffect(() => {
        let aborter = new AbortController()

        async function getData() {
            try {
                let response = await fetch(apiConfig.path.statistics.mostActiveGuestUsers(), {
                    signal: aborter.signal,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                let json = await response.json()
                console.log(json.data)
                if (response.status === 200) {
                    setUser(json.data)
                }
                
            } catch (e) {
                console.log("Error while fetching user data")
                console.log(e)
            }
        }

        if (accessToken) getData()

        return () => aborter.abort()
    }, [accessToken])

    return user

}