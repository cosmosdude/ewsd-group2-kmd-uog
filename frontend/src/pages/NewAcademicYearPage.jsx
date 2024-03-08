import {Link, useNavigate, useParams} from "react-router-dom"

// import "../style/tailwind.css"
import { useContext, useEffect, useRef, useState } from "react"
import InputField from "../components/InputField"
import Breadcrumb from "../components/Breadcrumb"
import AuthContext from "../contexts/AuthContext"

import ThreeDotIcon from "../assets/threedots.png"
import LoadingIndicator from "../components/LoadingIndicator"

const NewAcademicYearPage = () => {

    let accessToken = useContext(AuthContext);
    let navigate = useNavigate()

    let {id} = useParams()

    let [name, setName] = useState("");
    let [startDate, setStartDate] = useState("");
    let [endDate, setEndDate] = useState("");
    

    let [error, setError] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

    let commonHeaders = {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
    }

    useEffect(() => {
        if (id === 'new') return

        let aborter = new AbortController();

        async function fetchData() {
            try {
                let res = await fetch(
                    `http://127.0.0.1:8000/api/academic-years/${id}`,
                    {
                        signal: aborter.signal,
                        headers: commonHeaders
                    }
                )

                let json = await res.json()

                let data = json.data
                setName(data.name)
                setStartDate(data.start_date)
                setEndDate(data.end_date)
            } catch (error) {

            }
        }

        fetchData()

        return () => aborter.abort()
    }, [])

    function getFormData() {
        /*
            'name' => 'required',
            'start_date' => 'required',
            'end_date' => 'required'
        */
        let form = new FormData();
        form.set("name", name)
        form.set('start_date', startDate)
        form.set('end_date', endDate)
        return form;
    }

    async function createAcademicYear() {
        setError(null)

        if (!name) { setError("Academic name must not be empty") ; return }
        if (!startDate) { setError("Start date must not be empty") ; return }
        if (!endDate) { setError("End date is not selected"); return }

        setIsLoading(() => true)

        let response = await fetch('http://127.0.0.1:8000/api/academicyear', {
            method: "POST",
            headers: commonHeaders,
            body: getFormData()
        })

        try {
            if (response.status >= 200 && response.status < 300) {
                let json = await response.json();
                navigate("/academicyear")
            } else {
                setError("Unable to create academic year. (Parse Error)")
            }
        } catch {
            setError("Unable to create academic year. (Fetch Error)")
        }

        setIsLoading(() => false)
    }

    async function update() {
        setError(null)

        if (!name) { setError("Academic name must not be empty") ; return }
        if (!startDate) { setError("Start date must not be empty") ; return }
        if (!endDate) { setError("End date is not selected"); return }

        setIsLoading(() => true)

        let json = {
            name: name,
            start_date: startDate,
            end_date: endDate
        }
        console.log(json)

        let jsonString = JSON.stringify(json)
        console.log(jsonString)

        let response = await fetch(`http://127.0.0.1:8000/api/academicyearupdate/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                ...commonHeaders
            },
            body: jsonString
        })

        try {
            let json = await response.json();
            if (response.status >= 200 && response.status < 300) {
                console.log(json)
                // navigate("/academicyear")
            }  else {
                console.log(json)
                setError("Unable to update academic year. (Parse Error)")
            }
        } catch {
            setError("Unable to update academic year. (Fetch Error)")
        }

        setIsLoading(() => false)
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
                    {id == 'new' && <button 
                        className={`${isLoading && 'hidden'} grow basis-0 p-2 px-4 rounded bg-purple-500 text-white hover:opacity-50 transition-all`} 
                        onClick={createAcademicYear}
                    >Save</button>}
                    {id == 'new' && <Link 
                        className={`${isLoading && 'hidden'} grow basis-0 p-2 px-4 rounded bg-gray-400 text-white text-center hover:opacity-50 transition-all`} 
                        to="/users">
                        Cancel
                    </Link>}
                    {id != 'new' && <button 
                        className={`${isLoading && 'hidden'} grow basis-0 p-2 px-4 rounded bg-purple-500 text-white hover:opacity-50 transition-all`} 
                        onClick={update}
                    >Update</button>}
                    
                    {isLoading && <div className="flex items-center justify-center w-full"><LoadingIndicator/></div>}
                </div>
            </div>
        </div>
    )
}
export default NewAcademicYearPage