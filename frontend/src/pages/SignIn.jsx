import {Link} from "react-router-dom"

import Checkmark from "../assets/checkmark.svg"

import TextField from "../components/TextField"

import "../style/tailwind.css"
import Checkbox from "../components/Checkbox"
import { useEffect, useRef, useState } from "react"

export default () => {

    let isChecked = useRef(true);

    return (
        <>
            <div className="block h-screen bg-slate-50">
                <nav className="flex items-center p-6">
                    <h1 className="text-2xl font-bold">Large University</h1>
                    <span className="ml-auto flex items-center gap-4">
                        <h3 className="hidden md:block">Guest User?</h3>
                        <Link className="p-2 pl-4 pr-4 bg-slate-300 rounded hover:opacity-75 transition-all text-sm fond-bold" to="/signup">
                            Sign Up
                        </Link>
                    </span>
                </nav>
                <div className="flex pt-16">
                    <div className="w-[325px] mx-auto inline-flex flex-col items-center gap-8">
                        <div className="flex flex-col items-center gap-2">
                            <h1 className="text-xl font-bold">Sign In</h1>
                            <p className="text-sm">Sign in to your account.</p>
                        </div>
                        <TextField placeholder="username"/>
                        <TextField placeholder="password"/>
                        
                        <div className="w-full flex gap-2 flex-row items-center">
                            <Checkbox icon={Checkmark} label="Remember me" checked={isChecked.current} onChange={(newValue) => {
                                isChecked.current = newValue
                                console.log(isChecked.current)
                            }}/>
                            <span className="grow"></span>
                            <button className="text-sm hover:opacity-75 transition-all">Forget password?</button>
                        </div>
                        <button className="text-xs font-bold mt-[25px] w-[150px] p-2 bg-purple-500 text-white rounded hover:opacity-75 transition-all">Sign In</button>
                    </div>
                </div>
            </div>
        </>
    )
}