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

    let isChecked = useRef(false);
    let navigate = useNavigate();
    return (
        <>
            <div className="block h-screen">
                <SignInNavBar title="Large University" subtitle="Guest User?" cta="Sign Up" onCTA={()=>{navigate("/signup")}}/>
                <div className="flex pt-16">
                    <div className="w-[325px] mx-auto inline-flex flex-col items-center gap-2">
                        <div className="flex flex-col items-center gap-2 pb-6">
                            <h1 className="text-xl font-bold font-serif">Sign In</h1>
                            <p className="text-sm font-serif">Sign in to your account.</p>
                        </div>
                        <InputField className="w-full" src={PersonSVG} placeholder="Enter username"/>
                        <InputField className="w-full" src={LockSVG} placeholder="Enter password" type="password"/>
                        
                        <div className="w-full flex gap-2 flex-row items-center">
                            <Checkbox icon={Checkmark} label="Remember me" checked={isChecked.current} onChange={(newValue) => {
                                isChecked.current = newValue
                                console.log(isChecked.current)
                            }}/>
                            <span className="grow"></span>
                            <button className="text-sm font-serif text-[#0077B6] hover:opacity-75 transition-all">Forget password?</button>
                        </div>
                        <button className="text-xs font-serif font-bold mt-[25px] py-3 px-16 bg-[#0077B6] text-white rounded-full hover:opacity-75 transition-all">Sign In</button>
                    </div>
                </div>
            </div>
        </>
    )
}