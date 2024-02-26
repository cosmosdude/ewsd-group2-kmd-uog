import {Link, useNavigate} from "react-router-dom"

import "../style/tailwind.css"
import { useEffect, useRef, useState } from "react"
import SideNav from "../components/SideNav"
import SideNavItem from "../components/SideNavItem"

const DashboardPage = () => {
    return (
        <div className="block border">
            <div className="inline-flex p-0 border mx-auto">
                <div className="inline-block w-[25px] h-[25px] bg-slate-200 rounded"/>
            </div>
        </div>
    )
}

export default DashboardPage


