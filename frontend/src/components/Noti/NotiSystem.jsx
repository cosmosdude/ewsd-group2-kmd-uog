import { createContext, useContext, useState } from "react"
import NotiStackView from "./NotiStackView"

let NotiPushContext = createContext((notification) => {})

export function usePushNoti() {
    return useContext(NotiPushContext)
}

export default function NotiSystem({children}) {
    let [notis, setNotis] = useState([])

    let pushNotiFn = (noti) => {
        console.log("pn", "Notification pushed")

        noti = {...noti, id: crypto.randomUUID()}
        setNotis(notis => [noti, ...notis])
    }
    /*
    pushNoti({id, title, message, style})
    */
    return (
    <NotiPushContext.Provider value={pushNotiFn}>
        <NotiStackView notiState={[notis, setNotis]}/>
        {children}
    </NotiPushContext.Provider>
    )
}