import {Link, useNavigate} from "react-router-dom"

import "../style/tailwind.css"
import { useEffect, useRef, useState } from "react"
import SideNav from "../components/SideNav"
import SideNavItem from "../components/SideNavItem"
/*
<SideNav>
    <SideNavItem cta="Dashboard 123" onClick={() => {navigate("/home")}}/>
    <SideNavItem selected cta="Users"/>
    <SideNavItem cta="Faculty"/>
    <SideNavItem cta="Contributions"/>
    <SideNavItem cta="Logout" onClick={logout}/>
</SideNav>
*/
export default () => {
    let navigate = useNavigate()
    return (
        <div className="grow">
            <span className="flex p-4 px-8 gap-2 items-center">
                <Link to="/">home</Link><span>/</span><button disabled className="text-blue-400">users</button>
                <span className="grow"/>
                <button 
                    className="p-2 pl-8 pr-8 bg-purple-600 text-white rounded"
                    onClick={()=>{
                        navigate('new')
                    }}
                >
                    New Registration
                </button>
            </span>
        </div>
    )
}


