import {Link, useNavigate} from "react-router-dom"

import "../style/tailwind.css"
import { useEffect, useRef, useState } from "react"
import SideNav from "../components/SideNav"
import SideNavItem from "../components/SideNavItem"

const ContributionsPage = () => {
    return (
        <div className="flex h-full bg-slate-100">
            <div className="m-auto">
                <h1 className="text-3xl font-light text-gray-500">Contributions</h1>
                <h1 className="text-sm font-regular text-gray-400">This page is not yet ready</h1>
            </div>
        </div>
    )
}

export default ContributionsPage