import {Link, useNavigate} from "react-router-dom"

// Images
import PersonSVG from "../assets/account.svg"
import MailSVG from "../assets/mail.svg"
import LockSVG from "../assets/password.svg"

// Components
import SignInNavBar from "../components/SignInNavBar"
import InputField from "../components/InputField"

import "../style/tailwind.css"
import Dropdown from "../components/Dropdown"
import { useEffect, useState } from "react"
import LoadingIndicator from "../components/LoadingIndicator"
import useEffectAllFaculties from "../hooks/useEffectAllFaculties"
import apiConfig from "../configs/api.config"
import { z } from "zod"

const SignUpPage = () => {
    let navigate = useNavigate();
    let faculties = useEffectAllFaculties()[0].filter(x => x.id !== 1)

    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    // let [faculty, setFaculty] = useState(null);

    let [selectedFaculties, setSelectedFaculties] = useState([])

    let [password, setPassword] = useState("");
    let [retype, setRetype] = useState("")

    let [error, setError] = useState(null);
    let [isLoading, setIsLoading] = useState(false);
    

    function gotoSignIn() {
        navigate("/signin")
    }

    function gotoHomeIfAlreadyLoggedIn() {
        if (window.localStorage.getItem("accessToken")) {
            gotoHome()
        }
    }

    function getFormData() {
        let form = new FormData();
        form.set("name", username)
        form.set("email", email)
        form.set("password", password)
        for(let i = 0; i < selectedFaculties.length; i++) {
            let faculty = selectedFaculties[i]
            form.set(`faculties[${i}]`, faculty.id)
        }
        
        return form
    }

    async function signup(e) {
        setError(null);
        e.preventDefault()

        try {
            if (!username) throw "Username must not be empty"
            
            if (!email) throw "Email must not be empty"

            try { z.string().email().parse(email) } 
            catch { throw "Invalid email" }

            if (!selectedFaculties.length) throw "Faculty must not be empty" 
            if (!password) throw "Password must not be empty" 
            if (password.length < 8) throw "Password must be at least 8 characters long."
            if (!retype || retype !== password) throw "Passwords do not match" 
        } catch (error) {
            return setError(error)
        }

        

        
        
        
        

        


        setIsLoading(() => true)
        console.log("Logging in")
        
        try {
            let form = getFormData()
            console.log(form)
            let response = await fetch(
                apiConfig.path.guestRegister(),
                {
                    method: "POST",
                    headers: {
                        'Accept': "application/json"
                    },
                    body: getFormData()
                }
            )
            console.log(response)
            let value = await response.text()
            console.log(value)

            if (response.status >= 500) {
                pushNoti({
                    title: "Error",
                    message: `Internal server error (status: ${response.status})`
                })
            } else if (response.status >= 400) {
                let json = await response.json()
                pushNoti({
                    title: "Error",
                    message: `Unable to register account. (${json.message})`
                })
            }
            else if (response.status === 200) {
                gotoSignIn()
            } else {
                setError("Unable to sign up.")
                pushNoti({
                    title: "Error",
                    message: `Unable to register account. (status: ${response.status})`
                })
            }
        } catch (error) {
            console.log(error)
            setError("Unable to sign up.")
        }
        setIsLoading(() => false) 
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
                        <InputField 
                            className="w-full" src={PersonSVG} 
                            placeholder="Enter username"
                            value={username}
                            onChange={setUsername}
                        />
                        <InputField 
                            className="w-full" src={MailSVG} 
                            placeholder="Enter email address" 
                            type="email"
                            value={email}
                            onChange={setEmail}
                        />
                        <Dropdown className="w-full z-[1001]" 
                        title={
                            selectedFaculties.length !== 0
                            ? selectedFaculties.map(x => x.name).join(",") 
                            : "Select faculty"
                        } 
                        indices={selectedFaculties.map((x) => faculties.indexOf(x))}
                        options={faculties.map(x => x.name)} 
                        onChange={(option, index) => {
                            // setFaculty(faculties[index])
                            let faculty = faculties[index]
                            if (selectedFaculties.includes(faculty))
                                setSelectedFaculties(selectedFaculties.filter(x => x !== faculty))
                            else 
                                setSelectedFaculties([...selectedFaculties, faculty])
                            // setSelectedFaculties(

                            // )
                        }}/>
                        <InputField 
                            className="w-full" src={LockSVG} placeholder="Enter password" 
                            type="password"
                            value={password}
                            onChange={setPassword}    
                        />
                        <InputField 
                            className="w-full" 
                            src={LockSVG} 
                            placeholder="Retype password" type="password"
                            value={retype}
                            onChange={setRetype}
                        />
                        {error && <p className="w-full p-2 text-center rounded border border-red-100 bg-red-50 font-serif text-sm text-red-500">{error}</p>}
                        <div className=" mt-[25px] pb-[50px]">
                            <button 
                                className={`${isLoading && 'hidden'} text-xs font-serif font-bold py-[10px] px-[46px] bg-[#0077B6] text-white rounded-full hover:opacity-75 transition-all`}
                                onClick={signup}
                            >Sign Up</button>
                            {isLoading && <LoadingIndicator/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SignUpPage