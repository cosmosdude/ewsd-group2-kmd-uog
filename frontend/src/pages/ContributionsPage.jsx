import { Link, useNavigate } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import InputField from "../components/InputField"
import Dropdown from "../components/Dropdown"
import { useContext, useState } from "react"
import LoadingIndicator from "../components/LoadingIndicator"
import { useAuthContext } from "../contexts/AuthContext"
import useEffectUserDetail from "../hooks/useEffectUserDetail"

const ContributionsPage = () => {
    
    let accessToken = useAuthContext();
    let navigate = useNavigate()

    let user = useEffectUserDetail()
    let isStudent = user?.role_name === 'student'
    
    let shouldShowCurrent = ['administrator', 'm_coordinator', 'student']
        .includes(user?.role_name)

    let shouldShowUpcoming = ['administrator']
        .includes(user?.role_name)

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
            <div className="flex flex-col gap-4 md:gap-8 overflow-visible">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full flex-wrap transition-all">
                    <MagazineCard to='/magazine/history'>
                        Previous<br/>Magazines
                    </MagazineCard>
                    {shouldShowCurrent && <MagazineCard to='/magazine/current'>Current<br/>Magazines</MagazineCard>}
                    {shouldShowUpcoming && <MagazineCard to='/magazine/upcoming'>Upcoming<br/>Magazines</MagazineCard>}
                </div>
            </div>
        </div>
    )
}

export default ContributionsPage

function MagazineCard({to, children}) {
    return(
        <Link 
            className="
            flex 
            font-bold justify-between 
            text-center h-[150px] bg-secondary-200 hover:opacity-50 
            rounded-[6px]
            shadow-xl
            transition-all"
            to={to}
        >
            <p className="inline-block m-auto">
                {children}
            </p>
        </Link>
    )
}