import { Link, useNavigate } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import InputField from "../components/InputField"
import Dropdown from "../components/Dropdown"
import { useContext, useState } from "react"
import LoadingIndicator from "../components/LoadingIndicator"
import AuthContext from "../contexts/AuthContext"
import useEffectUserDetail from "../hooks/useEffectUserDetail"

const ContributionsPage = () => {
    
    let accessToken = useContext(AuthContext);
    let navigate = useNavigate()

    let user = useEffectUserDetail()
    let isStudent = user.role_name === 'student'
    
    let shouldShowCurrent = ['administrator', 'm_coordinator', 'student']
        .includes(user.role_name)

    console.log("user detail is", user)

    return (
        <div className="flex flex-col gap-8 w-full h-full p-4 px-8 overflow-y-hidden">
            <div className="flex gap-2 items-center">
                <Breadcrumb 
                    className="py-2"
                    links={[
                        {name: "home", link: "/home"},
                        {name: "magazines", current: true},
                    ]}/>
                <span className="grow"/>
            </div>
            <div className="flex flex-col gap-4 md:gap-8 overflow-y-scroll">
                <div className="grid grid-cols-3 gap-3 w-full flex-wrap">
                    <Link 
                        className="flex font-bold justify-between text-center h-[150px] bg-purple-100 hover:opacity-50 transition-all"
                        to='/magazine/history'
                    >
                        <p className="inline-block m-auto">Previous Magazines</p>
                    </Link>
                    {shouldShowCurrent && <Link 
                        className="flex font-bold justify-between text-center h-[150px] bg-purple-100 hover:opacity-50 transition-all"
                        to='/magazine/current'
                    >
                        <p className="inline-block m-auto">Current Magazines</p>
                    </Link>}
                    {/* { isStudent && <Link 
                        className="flex font-bold justify-between text-center h-[150px] bg-purple-100 hover:opacity-50 transition-all"
                        // to='/magazine/current'
                    >
                        <p className="inline-block m-auto">Add Submission</p>
                    </Link>} */}
                    
                    {/* <div className="inline-block basis-1/3 h-[150px] bg-slate-300"/>
                    <div className="inline-block basis-1/3 h-[150px] bg-slate-300"/>
                    <div className="inline-block basis-1/3 h-[150px] bg-slate-300"/> */}
                </div>
            </div>
        </div>
    )
}

export default ContributionsPage