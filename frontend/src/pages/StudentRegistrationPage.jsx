import { Link } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import InputField from "../components/InputField"
import Dropdown from "../components/Dropdown"
import { useState } from "react"

const StudentRegistrationPage = () => {

    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    let faculties = ["Business", "Information Technology", "Marketing", "Arts"]
    let [phone, setPhone] = useState("");
    let [address, setAddress] = useState("");
    let [password, setPassword] = useState("");
    let [retype, setRetype] = useState("");
    let [faculty, setFaculty] = useState(null);

    return (
        <div className="flex flex-col gap-4 w-full p-4 px-8">
            <div className="flex gap-2 items-center">
                <Breadcrumb 
                    className="py-2"
                    links={[
                        {name: "home", link: "/home"},
                        {name: "users", link: "/users"},
                        {name: "new registration", current: true},
                    ]}/>
                <span className="grow"/>
            </div>
            <div className="flex flex-col grow gap-4 md:gap-8">
                <div className="flex w-full gap-4 md:gap-8 flex-col md:flex-row">
                    <InputField className="grow" placeholder="username" value={username} onChange={setUsername}/>
                    <InputField className="grow" placeholder="email" value={email} onChange={setEmail}/>
                </div>
                <div className="flex w-full gap-4 md:gap-8 flex-col md:flex-row">
                    <Dropdown 
                        className="grow bg-white basis-0"
                        title={faculty ? faculty : "Select faculty"} options={faculties} onChange={(option, index) => {
                            setFaculty(option)
                        }}
                    />
                    <Dropdown className="grow basis-0" title="Student" disabled/>
                </div>
                <div className="flex w-full gap-4 md:gap-8 flex-col md:flex-row">
                    <InputField className="grow" placeholder="phone number" value={phone} onChange={setPhone}/>
                    <InputField className="grow" placeholder="address" value={address} onChange={setAddress}/>
                </div>
                <div className="flex w-full gap-4 md:gap-8 flex-col md:flex-row">
                    <InputField className="grow" placeholder="password" type="password" value={password} onChange={setPassword}/>
                    <InputField className="grow" placeholder="retype password" type="password" value={retype} onChange={setRetype}/>
                </div>
                <div className="flex w-full gap-4 md:grap-8 md:w-[300px] md:mx-auto">
                    <button className="grow basis-0 p-2 px-4 rounded bg-purple-500 text-white hover:opacity-50 transition-all" onClick>Save</button>
                    <button className="grow basis-0 p-2 px-4 rounded bg-gray-400 text-white hover:opacity-50 transition-all" onClick>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default StudentRegistrationPage