import {Link, useNavigate} from "react-router-dom"

// Images
import PersonSVG from "../assets/account.svg"
import MailSVG from "../assets/mail2.svg"
import LockSVG from "../assets/password.svg"
import DownArrowSVG from "../assets/downarrow.svg"

// Components
import SignInNavBar from "../components/SignInNavBar"
import InputField from "../components/InputField"

import "../style/tailwind.css"
import Dropdown from "../components/Dropdown"
import { useEffect, useState } from "react"

export default () => {
    let navigate = useNavigate();

    let [faculty, setFaculty] = useState(null);
    let faculties = ["Business", "Information Technology", "Marketing", "Arts"]

    function gotoHome() {
        navigate("/")
    }

    function gotoHomeIfAlreadyLoggedIn() {
        if (window.localStorage.getItem("accessToken")) {
            gotoHome()
        }
    }

    useEffect(gotoHomeIfAlreadyLoggedIn);

    return (
        <>
            <div className="block h-screen">
                <SignInNavBar title="Large University" cta="Sign In" onCTA={()=>{navigate("/signin")}}/>
                <div className="flex mt-16">
                    <div className="w-[325px] mx-auto inline-flex flex-col items-center gap-2">
                        <div className="flex flex-col items-center gap-2 mb-6">
                            <h1 className="text-xl font-bold font-serif">Sign Up</h1>
                            <p className="text-sm font-serif">Sign up and read the selected articles.</p>
                        </div>
                        <InputField className="w-full" src={PersonSVG} placeholder="Enter username"/>
                        <InputField className="w-full" src={MailSVG} placeholder="Enter email address" type="email"/>
                        <Dropdown title={faculty ? faculty : "Select faculty"} options={faculties} onChange={(option, index) => {
                            setFaculty(option)
                        }}/>
                        <InputField className="w-full" src={LockSVG} placeholder="Enter password" type="password"/>
                        <InputField className="w-full" src={LockSVG} placeholder="Retype password" type="password"/>
                        <button className="text-xs font-serif font-bold mt-[25px] py-3 px-16 bg-[#0077B6] text-white rounded-full hover:opacity-75 transition-all">Sign Up</button>
                    </div>
                </div>
            </div>
        </>
    )
}