import { Link, useNavigate, useParams } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import InputField from "../components/InputField"
import Dropdown from "../components/Dropdown"
import { useContext, useEffect, useState } from "react"
import LoadingIndicator from "../components/LoadingIndicator"
import { useAuthContext } from "../contexts/AuthContext"

import ThreeDotIcon from "../assets/threedots.png"
import apiConfig from "../configs/api.config"
import FilledButton from "../components/FilledButton"

const MagazineNewPage = () => {
    
    let accessToken = useAuthContext();
    let navigate = useNavigate()

    let {id} = useParams()

    let isUpdate = id !== 'new'

    let [magazine, setMagazine] = useState({
        "name": null,
        "start_date": null,
        "closure_date": null,
        "final_closure_date": null,
        "academic_id": null
    })

    let [error, setError] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

    function getData() {
        return {...magazine}
    }

    function getFormData() {
        let f = new FormData();
        /*
        name:Closure Two
        start_date:2024-01-19
        closure_date:2024-01-28 03:56:25
        final_closure_date:2024-02-14 03:56:25
        academic_id:1
        */
       // if magazine's id exists, include it
        magazine.id && f.set('id', magazine.id)

        let data = getData()
        console.log(Object.entries(data))
        for (const [k, v] of Object.entries(getData())) f.set(k, v)
        console.log(f)

        f.set('name', magazine.name)
        f.set('start_date', magazine.start_date)
        f.set('closure_date', magazine.closure_date)
        f.set('final_closure_date', magazine.final_closure_date)
        f.set('academic_id', magazine.academic_id ? magazine.academic_id : '1')
        console.log(f)
        return f
    }

    async function upsertMagazine() {
        console.log("magazine id:", magazine.id)

        setError(null)
        console.log("Before test")

        try {
            if (!magazine.name) throw 'Title must not be empty'
            if (!magazine.start_date) throw 'Start date must not be empty'
            if (!magazine.closure_date) throw 'Closure date must not be empty'

            let startDate = new Date(magazine.start_date)
            let closureDate = new Date(magazine.closure_date)
            if (startDate > closureDate) throw "Closure date cannot be earlier then start date."

            if (!magazine.final_closure_date) throw 'Final closure date must not be empty'
            let finalDate = new Date(managzine.final_closure_date)
            if (closureDate > finalDate) throw "Final closure date cannot be earlier then closure date."

        } catch (error) { return setError(error) }

        console.log("After test")
        setIsLoading(() => true)
        if (isUpdate) await updateMagazine()
        else await createMagazine()
        setIsLoading(() => false)
    }

    async function createMagazine() {
        let form = getFormData()
        console.log(Array.from(form.keys()))
        console.log(Array.from(form.values()))
        // return;
        try {
            let response = await fetch(
                apiConfig.path.magazines(), {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json'
                },
                body: getFormData()
            })

            try {
                if (response.status >= 200 && response.status < 300) {
                    let json = await response.json()
                    console.log(json)
                    navigate(`/magazine/current/${json.data.id}`)
                } else {
                    setError(`Unable to create magazine closure. (${response.status})`)
                }
                
            } catch (error) {
                setError("Unable to create magazine closure. (Parse Error)")
            }
        } catch (error) {
            setError("Unable to create magazine closure. (Internal Error)")
        }
    }

    async function updateMagazine() {
        let data = getData()
        let urlencoded = Object.entries(data)
            .map(x => x.join('=')).join("&")
        console.log("Urlencoded:", urlencoded)
        try {
            let response = await fetch(
                apiConfig.path.magazines(id), {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: urlencoded
            })

            try {
                if (response.status >= 200 && response.status < 300) {
                    let json = await response.json()
                    console.log(json)
                    // navigate(`/magazine/current/${json.data.id}`)
                    navigate()
                } else {
                    setError(`Unable to create magazine closure. (${response.status})`)
                }
                
            } catch (error) {
                setError("Unable to create magazine closure. (Parse Error)")
            }
        } catch (error) {
            setError("Unable to create magazine closure. (Internal Error)")
        }
    }

    useEffect(() => {
        // if it is not update, don't fetch detail
        if (!isUpdate) return;
        // otherwise, fetch detail

        // To handle abortion
        let aborter = new AbortController()
        async function fetchData() {
            try {
                let response = await fetch(
                    apiConfig.path.magazines(id), {
                    signal: aborter.signal,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Accept': 'application/json'
                    }
                })
    
                let json = await response.json()
                if (response.status === 200) {
                    let results = json.data
                    console.log(results)
                    setMagazine(results)
                } else if (response.status === 404) {     
                    navigate('notfound')
                } else {
                    console.log("MAGAZINE", "Error")
                }
            } catch (error) { 
                console.error("MAGAZINE", error)
            }
        }
        // fetch async
        fetchData()
        // clean up by aborting the request
        return () => { aborter.abort() }
    }, [])

    return (
        <div className="flex flex-col gap-8 w-full h-full p-4 px-8 overflow-y-hidden">
            <div className="flex gap-2 items-center">
                <Breadcrumb 
                    className="py-2"
                    links={[
                        {name: "home", link: "/home"},
                        {name: "magazines", link: "/contribution"},
                        {name: "current", link: "/magazine/current"},
                        {name: id === 'new' ? "new" : 'update', current: true},
                    ]}/>
                <span className="grow"/>
            </div>
            <form className="flex flex-col gap-4 md:gap-8 overflow-y-scroll" onSubmit={(e) => { 
                e.preventDefault() 
                console.log("Form submitted")
                upsertMagazine()
            }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 md:gap-8 flex-col md:flex-row">
                    <InputField 
                        className="grow" 
                        // disabled={isUpdate}
                        placeholder="Title*" 
                        value={magazine.name} 
                        onChange={
                            (name) => {
                                setMagazine({...magazine, name})
                            }
                        } 
                    />
                    <Dropdown disabled title='Select academic year'/>
                </div>
                <fieldset className="border-2 rounded p-4">
                    <legend className="px-2">Set closure date</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 md:gap-8 flex-col md:flex-row">
                        <InputField 
                            // disabled={isUpdate}
                            type="date" placeholder="start date" value={magazine.start_date} 
                            onChange={
                                (v) => {
                                    console.log(v)
                                    console.log({...magazine, start_date: v})
                                    setMagazine({...magazine, start_date: v})
                                }
                            } 
                        />
                        <InputField 
                            // disabled={isUpdate}
                            type="date" placeholder="closure date"
                            value={magazine.closure_date} 
                            onChange={
                                (v) => {
                                    console.log(v)
                                    console.log({...magazine, closure_date: v})
                                    setMagazine({...magazine, closure_date: v})
                                }
                            } 
                        />
                    </div>
                </fieldset>
                <fieldset className="border-2 rounded p-4">
                    <legend className="px-2">Set final closure date</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 md:gap-8 flex-col md:flex-row">
                        <InputField 
                            // disabled={isUpdate}
                            type="date" placeholder="final closure date" 
                            value={magazine.final_closure_date} 
                            onChange={
                                (v) => {
                                    console.log(v)
                                    console.log({...magazine, final_closure_date: v})
                                    setMagazine({...magazine, final_closure_date: v})
                                }
                            } 
                        />
                    </div>
                </fieldset>
                {error && <p className="w-full p-2 text-center rounded border border-red-100 bg-red-50 font-serif text-sm text-red-500">
                    {error}
                </p>}
                <div className={`flex w-full gap-4 md:grap-8 ${isUpdate ? 'md:w-[150px]' : 'md:w-[300px]'} md:mx-auto`}>
                    {/* {!isUpdate && <button 
                        className={`${isLoading && 'hidden'} grow basis-0 p-2 px-4 rounded bg-purple-500 text-white hover:opacity-50 transition-all`} 
                        // onClick={null}
                    >Save</button>} */}

                    {!isUpdate && <FilledButton title="Save"/>}

                    
                    {/* {isUpdate && <button 
                        className={`${isLoading && 'hidden'} grow basis-0 p-2 px-4 rounded bg-purple-500 text-white hover:opacity-50 transition-all`} 
                        // onClick={null}
                    >Update</button>} */}

                    {isUpdate && <FilledButton title="Update"/>}

                    {/* {!isUpdate && <Link 
                        className={`${isLoading && 'hidden'} grow basis-0 p-2 px-4 rounded bg-gray-400 text-white text-center hover:opacity-50 transition-all`} 
                        to="/magazine/current">
                        Cancel
                    </Link>} */}
                    {!isUpdate && <FilledButton title="Cancel" to={-1} gray/>}
                    {isLoading && <div className="flex items-center justify-center w-full"><LoadingIndicator/></div>}
                </div>
            </form>
        </div>
    )
}

export default MagazineNewPage