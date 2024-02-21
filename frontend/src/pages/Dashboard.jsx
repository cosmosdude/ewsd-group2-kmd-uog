import {Link, useNavigate} from "react-router-dom"

import Checkmark from "../assets/checkmark.svg"
import PersonSVG from "../assets/account.svg"
import LockSVG from "../assets/password.svg"

import InputField from "../components/InputField"

import "../style/tailwind.css"
import Checkbox from "../components/Checkbox"
import { useEffect, useRef, useState } from "react"
import SignInNavBar from "../components/SignInNavBar"

export default () => {
    let navigate = useNavigate();

    useEffect(() => {
        if (!window.localStorage.getItem("accessToken")) {
            navigate("/signin")
        }
    })

    function logout() {
        window.localStorage.removeItem("accessToken", null)
        navigate("/signin")
    }

    return (
        <div>
            <h1>Welcome to Dashboard!</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}


