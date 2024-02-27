import {Link, useNavigate} from "react-router-dom"

import "../style/tailwind.css"
import { useEffect, useRef, useState } from "react"
import SideNav from "../components/SideNav"
import SideNavItem from "../components/SideNavItem"

export default () => {
    let navigate = useNavigate();

    function gotoSignIn() { navigate("signin") }

    useEffect(() => {
        if (!window.localStorage.getItem("accessToken")) gotoSignIn()
    })

    function logout() {
        window.localStorage.removeItem("accessToken", null)
        gotoSignIn()
    }

    return (
        <div className="h-screen flex bg-slate-50">
            {/* left side */}
            <SideNav>
                <SideNavItem selected cta="Dashboard 123"/>
                <SideNavItem cta="Users" onClick={() => {navigate("/users")}}/>
                <SideNavItem cta="Faculty"/>
                <SideNavItem cta="Contributions"/>
                <SideNavItem cta="Logout" onClick={logout}/>
            </SideNav>
            {/* right
             side */}

            <detail className="grow"></detail>
            {/* <h1>Welcome to Dashboard!</h1> */}
            {/* <button onClick={logout}>Logout</button> */}

        </div>
    )
}


