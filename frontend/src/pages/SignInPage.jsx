import {useNavigate} from "react-router-dom"

import Checkmark from "../assets/checkmark.svg"
import PersonSVG from "../assets/account.svg"
import LockSVG from "../assets/password.svg"

import InputField from "../components/InputField"

import "../style/tailwind.css"
import Checkbox from "../components/Checkbox"
import { useEffect, useRef, useState } from "react"
import SignInNavBar from "../components/SignInNavBar"
import LoadingIndicator from "../components/LoadingIndicator"
import apiConfig from "../configs/api.config"
import { usePushNoti } from "../components/Noti/NotiSystem"

import { browserName, detect } from "detect-browser"
import { capitalized } from "../util/capitalized"
import { useAuthState } from "../hooks/AuthToken/AuthToken"
import { loginTime } from "../util/last_login_time"

const SignInPage = () => {
    let pushNoti = usePushNoti()
    let navigate = useNavigate()
    let [auth, setAuth] = useAuthState()

    function gotoHome() {
        navigate("/")
    }

    function gotoHomeIfAlreadyLoggedIn() {
        if (auth) gotoHome()
        // if (window.localStorage.getItem("accessToken")) {
        //     gotoHome()
        // }
    }

    let [isChecked, setIsChecked] = useState(false);
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

    function getSignInFormData() {
        let browser = detect(navigator.userAgent)
        let form = new FormData();
        form.set("email", username)
        form.set("password", password)
        form.set('browser', capitalized(`${browser.name ?? "Unknown"} (v${browser.version ?? '0.0.0'})`))
        return form
    }

    function initRememberMe() {
        // console.log("Remember Me", window.localStorage.getItem("rememberMe"))
        // console.log("Remember Me", window.localStorage.getItem("rememberMe") == 'true')
        setIsChecked('true' == window.localStorage.getItem("rememberMe"))
    }

    function initEmail() {
        
        if (window.localStorage.getItem("rememberMe") == 'true') {
            setUsername(window.localStorage.getItem("remembered"))
        }
    }

    async function login(e) {
        e.preventDefault()
        console.log(browserName(navigator.userAgent) )
        let browser = detect(navigator.userAgent)
        console.log(capitalized(`${browser.name ?? "Unknown"} (v${browser.version ?? '0.0.0'})`))
        console.log(capitalized("hello world"))
        console.log(capitalized("h"))

        setError(null);
        setIsLoading(() => true)
        e.preventDefault()

        console.log("Logging in")
        
        try {
            let response = await fetch(
                apiConfig.path.login(),
                {
                    method: "POST",
                    body: getSignInFormData()
                }
            )
            console.log(response)
            let json = await response.json()
            console.log(json)

            if (response.status === 200) {
                // window.localStorage.setItem("accessToken", json.data.token)
                // lastLoginTime = json.data.last_login_time
                loginTime.value = json.data.last_login_time
                setAuth(json.data.token)
                gotoHome()
            } else if (response.status >= 500) {
                pushNoti({
                    title: "Error",
                    message: `Internal server error (status: ${response.status})`
                })
            }
            else {
                setError("Invalid email or password.")
            }
        } catch (error) {
            console.log(error)
            setError("Unable to login.")
        }
        setIsLoading(() => false)    
    }

    // Upon launch, 
    // try to check if the user is already logged.
    // if so, go to home page
    useEffect(gotoHomeIfAlreadyLoggedIn)
    // Try to check remember me if recently checked
    useEffect(initRememberMe)
    // Try to set email if remember me was enabled
    useEffect(initEmail)

    return (
        <>
            <div className="block h-screen">
                <SignInNavBar title="Large University" subtitle="Guest User?" cta="Sign Up" onCTA={()=>{navigate("/signup")}}/>
                <form className="flex pt-16" onSubmit={login}>
                    <div className="w-[325px] mx-auto inline-flex flex-col items-center gap-2">
                        <div className="flex flex-col items-center gap-2 pb-6">
                            <h1 className="text-lg font-bold font-serif">Sign In</h1>
                            <p className="text-sm font-serif">Sign in to your account.</p>
                        </div>
                        {/* <input value={username} onChange={(e) => {setUsername(e.target.value)}}/> */}
                        <InputField 
                            className="w-full" 
                            src={PersonSVG} 
                            placeholder="Enter username" 
                            value={username}
                            type="email"
                            onChange={(newValue) => {
                                setUsername(newValue)
                                // save to local
                                window.localStorage.setItem("remembered", newValue)
                            }}
                            />
                        <InputField 
                            className="w-full" src={LockSVG} 
                            placeholder="Enter password" 
                            type="password" 
                            value={password}
                            onChange={setPassword}
                            />
                        {error && <p className="w-full p-2 text-center rounded border border-red-100 bg-red-50 font-serif text-sm text-red-500">{error}</p>}
                        <div className="w-full flex gap-2 flex-row items-center">
                            <Checkbox icon={Checkmark} label="Remember me" checked={isChecked} onChange={(newValue) => {
                                // update UI
                                setIsChecked(newValue) 
                                // save to local
                                window.localStorage.setItem("rememberMe", newValue) 
                            }}/>
                            <span className="grow"></span>
                            {/* <button 
                                className="text-sm font-serif text-secondary-500 hover:opacity-75 transition-all"
                                onClick={(e) => {
                                    e.preventDefault()
                                }}
                            >Forget password?</button> */}
                        </div>
                        <div className="mt-[25px] pb-[25px]">
                            <button 
                                className={`${isLoading && "hidden"} text-xs font-serif font-bold py-[10px] px-[46px] bg-secondary-500 text-white rounded-full hover:opacity-75 transition-all`}
                                onClick={login}
                            >Sign In</button>
                            {isLoading && <LoadingIndicator/>}
                        </div>
                        
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignInPage