import {Link, useNavigate} from "react-router-dom"

import "../style/tailwind.css"
import { useContext, useEffect, useRef, useState } from "react"
import InputField from "../components/InputField"
import Breadcrumb from "../components/Breadcrumb"
import AuthContext from "../contexts/AuthContext"

import ThreeDotIcon from "../assets/threedots.png"

const NewAcademicYearPage = () => {

    let accessToken = useContext(AuthContext);
    let navigate = useNavigate()

    let [name, setName] = useState("");
    let [startDate, setStartDate] = useState("");
    let [endDate, setEndDate] = useState("");
    

    let [error, setError] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

    function getFormData() {
        let form = new FormData();
        form.set("name", name)
        return form;
    }

    async function createAcademicYear() {
        setError(null)
        if (!name) { setError("Academic name must not be empty") ; return }
        if (!startDate) { setError("Start date must not be empty") ; return }

        if (!endDate) { setError("End date is not selected"); return }

        // setIsLoading(() => true)

        // let response = await fetch('http://127.0.0.1:8000/api/student-register', {
        //     method: "POST",
        //     headers: {
        //         'Authorization': `Bearer ${accessToken}`,
        //         'Accept': 'application/json'
        //     },
        //     body: getFormData()
        // })

        // try {
        //     if (response.status === 200) {
        //         let json = await response.json();
        //         navigate("/users")
        //     } else if (response.status === 422) {
        //         setError("Account with same email is already registered.")
        //     } else {
        //         setError("Unable to create student account. (Parse Error)")
        //     }
        // } catch {
        //     setError("Unable to create student account. (Fetch Error)")
        // }

        // setIsLoading(() => false)
    }

    return (
        <div className="flex flex-col gap-8 w-full h-full p-4 px-8 overflow-y-hidden">
            <div className="flex gap-2 items-center">
                <Breadcrumb 
                    className="py-2"
                    links={[
                        {name: "home", link: "/home"},
                        {name: "academic year", link: "/academicyear"},
                        {name: "new academic year", current: true},
                    ]}/>
                <span className="grow"/>
            </div>
            <div className="flex flex-col gap-4 md:gap-8 overflow-y-scroll">
                <div className="flex w-full gap-4 md:gap-8 flex-col md:flex-row">
                    <InputField className="grow basis-0" placeholder="academic name" value={name} onChange={setName}/>
                    <InputField className="grow basis-0" placeholder="start date" type="date" value={startDate} onChange={setStartDate}/>
                </div>
                <div className="flex w-full gap-4 md:gap-8 flex-col md:flex-row">
                    <InputField className="grow basis-0" placeholder="end date" type="date" value={endDate} onChange={setEndDate}/>
                    <div className="grow basis-0"/>
                </div>
                {error && <p className="w-full p-2 text-center rounded border border-red-100 bg-red-50 font-serif text-sm text-red-500">
                    {error}
                </p>}
                <div className="flex w-full gap-4 md:grap-8 md:w-[300px] md:mx-auto">
                    <button 
                        className={`${isLoading && 'hidden'} grow basis-0 p-2 px-4 rounded bg-purple-500 text-white hover:opacity-50 transition-all`} 
                        onClick={createAcademicYear}
                    >Save</button>
                    <Link 
                        className={`${isLoading && 'hidden'} grow basis-0 p-2 px-4 rounded bg-gray-400 text-white text-center hover:opacity-50 transition-all`} 
                        to="/users">
                        Cancel
                    </Link>
                    {isLoading && <div className="flex items-center justify-center w-full"><LoadingIndicator/></div>}
                </div>
            </div>
        </div>
    )
}
export default NewAcademicYearPage