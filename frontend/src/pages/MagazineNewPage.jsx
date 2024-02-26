import { Link, useNavigate, useParams } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import InputField from "../components/InputField"
import Dropdown from "../components/Dropdown"
import { useContext, useEffect, useState } from "react"
import LoadingIndicator from "../components/LoadingIndicator"
import AuthContext from "../contexts/AuthContext"

import ThreeDotIcon from "../assets/threedots.png"

const MagazineNewPage = () => {
    
    let accessToken = useContext(AuthContext);
    let navigate = useNavigate()

    let {id} = useParams()

    let isUpdate = id !== 'new'

    let [error, setError] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

    return (
        <div className="flex flex-col gap-8 w-full h-full p-4 px-8 overflow-y-hidden">
            <div className="flex gap-2 items-center">
                <Breadcrumb 
                    className="py-2"
                    links={[
                        {name: "home", link: "/home"},
                        {name: "contributions", link: "/contribution"},
                        {name: "forum", link: "/magazine/current"},
                        {name: id === 'new' ? "new forum" : 'update forum', current: true},
                    ]}/>
                <span className="grow"/>
            </div>
            <form className="flex flex-col gap-4 md:gap-8 overflow-y-scroll">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 md:gap-8 flex-col md:flex-row">
                    <InputField className="grow" placeholder="username" />
                    <InputField className="grow" placeholder="email"/>
                </div>
                <fieldset className="border-2 rounded p-4">
                    <legend className="px-2">Set closure date</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 md:gap-8 flex-col md:flex-row">
                        <InputField type="date" placeholder="start date" />
                        <InputField type="date" placeholder="closure date"/>
                    </div>
                </fieldset>
                <fieldset className="border-2 rounded p-4">
                    <legend className="px-2">Set final closure date</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 md:gap-8 flex-col md:flex-row">
                        <InputField type="date" placeholder="final closure date" />
                    </div>
                </fieldset>
                {error && <p className="w-full p-2 text-center rounded border border-red-100 bg-red-50 font-serif text-sm text-red-500">
                    {error}
                </p>}
                <div className={`flex w-full gap-4 md:grap-8 ${isUpdate ? 'md:w-[150px]' : 'md:w-[300px]'} md:mx-auto`}>
                    {!isUpdate && <button 
                        className={`${isLoading && 'hidden'} grow basis-0 p-2 px-4 rounded bg-purple-500 text-white hover:opacity-50 transition-all`} 
                        onClick={null}
                    >Save</button>}
                    {isUpdate && <button 
                        className={`${isLoading && 'hidden'} grow basis-0 p-2 px-4 rounded bg-purple-500 text-white hover:opacity-50 transition-all`} 
                        onClick={null}
                    >Update</button>}
                    {!isUpdate && <Link 
                        className={`${isLoading && 'hidden'} grow basis-0 p-2 px-4 rounded bg-gray-400 text-white text-center hover:opacity-50 transition-all`} 
                        to="/magazine/current">
                        Cancel
                    </Link>}
                    {isLoading && <div className="flex items-center justify-center w-full"><LoadingIndicator/></div>}
                </div>
            </form>
        </div>
    )
}

export default MagazineNewPage