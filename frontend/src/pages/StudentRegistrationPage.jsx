import { Link, useNavigate } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import InputField from "../components/InputField"
import Dropdown from "../components/Dropdown"
import { useContext, useState } from "react"
import LoadingIndicator from "../components/LoadingIndicator"
import AuthContext from "../contexts/AuthContext"
import useEffectAllFaculties from "../hooks/useEffectAllFaculties"
import FilledButton from "../components/FilledButton"

const StudentRegistrationPage = () => {
    
    let accessToken = useContext(AuthContext);
    let navigate = useNavigate()

    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    // let faculties = ["Business", "Information Technology", "Marketing", "Arts"]

    let [faculties] = useEffectAllFaculties();

    let [phone, setPhone] = useState("");
    let [address, setAddress] = useState("");
    let [password, setPassword] = useState("");
    let [retype, setRetype] = useState("");

    let [faculty, setFaculty] = useState(null);

    let [error, setError] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

    function getFormData() {
        let form = new FormData();
        form.set("name", username)
        form.set("email", email)
        form.set("password", password)
        form.set("role_id", "4")
        form.set("faculty_id", faculty.id)
        console.log('faculty.id', faculty.id)
        form.set('phone', phone)
        form.set('academic_id', 1)
        console.log(form)
        return form;
    }

    async function createAccount() {
        setError(null)
        if (!username) { setError("Username must not be empty") ; return }
        if (!email) { setError("Email must not be empty") ; return }
        if (!faculty) { setError("Faculty is not selected"); return }
        if (!password) { setError("Password must not be empty") ; return }
        if (!retype || password !== retype) { setError("Password must be the same") ; return }

        setIsLoading(() => true)

        let response = await fetch('http://127.0.0.1:8000/api/register', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            },
            body: getFormData()
        })

        try {
            if (response.status === 200) {
                let json = await response.json();
                navigate("/users")
            } else if (response.status === 422) {
                setError("Account with same email is already registered.")
            } else {
                setError("Unable to create student account. (Parse Error)")
            }
        } catch {
            setError("Unable to create student account. (Fetch Error)")
        }

        setIsLoading(() => false)
    }

    return (
        <div className="flex flex-col gap-4 w-full h-full p-4 px-8 overflow-y-hidden">
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
            {/* <div className="flex flex-col gap-4 md:gap-8 overflow-y-scroll"> */}
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 md:gap-8 flex-col md:flex-row">
                {/* <div className="flex w-full gap-4 md:gap-8 flex-col md:flex-row"> */}
                    <InputField className="grow" placeholder="username" value={username} onChange={setUsername}/>
                    <InputField className="grow" placeholder="email" value={email} onChange={setEmail}/>
                {/* </div> */}
                {/* <div className="flex w-full gap-4 md:gap-8 flex-col md:flex-row"> */}
                    <Dropdown 
                        className="grow bg-white basis-0 z-[1001]"
                        title={faculty ? faculty.name : "Select faculty"} 
                        options={faculties.map(x => x.name)} 
                        onChange={(option, index) => {
                            setFaculty(faculties[index])
                        }}
                    />
                {/* </div> */}
                {/* <div className="flex w-full gap-4 md:gap-8 flex-col md:flex-row"> */}
                    <InputField className="grow" placeholder="phone number" value={phone} onChange={setPhone}/>
                {/* </div> */}
                {/* <div className="flex w-full gap-4 md:gap-8 flex-col md:flex-row"> */}
                    <InputField className="grow" placeholder="password" type="password" value={password} onChange={setPassword}/>
                    <InputField className="grow" placeholder="retype password" type="password" value={retype} onChange={setRetype}/>
                {/* </div> */}
            </div>
            {error && <p className="w-full p-2 text-center rounded border border-red-100 bg-red-50 font-serif text-sm text-red-500">
                    {error}
                </p>}
                {isLoading && <div className="w-full flex items-center justify-center"><LoadingIndicator/></div>}
                <div className="grid grid-cols-2 w-full gap-4 md:grap-8 md:w-[300px] md:mx-auto">
                    <FilledButton title="Save" onClick={createAccount}/>
                    <FilledButton title="Cancel" gray to={-1} />
                </div>
                
        </div>
    )
}

export default StudentRegistrationPage