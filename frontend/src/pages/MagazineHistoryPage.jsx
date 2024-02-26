import { Link, useNavigate } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import InputField from "../components/InputField"
import Dropdown from "../components/Dropdown"
import { useContext, useState } from "react"
import LoadingIndicator from "../components/LoadingIndicator"
import AuthContext from "../contexts/AuthContext"

const MagazineHistoryPage = () => {
    
    let accessToken = useContext(AuthContext);
    let navigate = useNavigate()

    return (
        <div className="flex flex-col gap-8 w-full h-full p-4 px-8 overflow-y-hidden">
            <div className="flex gap-2 items-center">
                <Breadcrumb 
                    className="py-2"
                    links={[
                        {name: "home", link: "/home"},
                        {name: "contributions", link: "/contribution"},
                        {name: "history", current: true},
                    ]}/>
                <span className="grow"/>
            </div>
            <div className="flex flex-col gap-4 md:gap-8 overflow-y-scroll">
                
            </div>
        </div>
    )
}

export default MagazineHistoryPage