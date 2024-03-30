import {Link, useLocation, useNavigate, useParams} from "react-router-dom"

import "../style/tailwind.css"
import { useContext, useEffect, useRef, useState } from "react"
import Breadcrumb from "../components/Breadcrumb"
import { useAuthContext } from "../contexts/AuthContext"
import InputField from "../components/InputField"
import Dropdown from "../components/Dropdown"
import LoadingIndicator from "../components/LoadingIndicator"
import useEffectAllFaculties from "../hooks/useEffectAllFaculties"
import FilledButton from "../components/FilledButton"
import apiConfig from "../configs/api.config"
import { z } from "zod"
import { isPhone } from "../util/isPhone"
import useFacultyDetail from "../hooks/useFacultyDetail"

export default function FacultyDetailPage() {

    let { id } = useParams()

    let {pathname} = useLocation()

    let navigate = useNavigate()

    let detail = useFacultyDetail(id)

    return (
        <div className="flex flex-col h-full p-4 px-8 gap-3 overflow-y-hidden">
            <div className="flex gap-2 items-center">
                <Breadcrumb 
                    className="py-2"
                    links={[
                        {name: "home", link: "/home"},
                        {name: "faculty", link: "/faculty"},
                        {name: "details faculty", current: true}
                    ]}
                />
                <span className="grow"/>
            </div>
            <div className="flex flex-col gap-4 md:gap-8 overflow-y-scroll">
                <fieldset className="border flex items-center justify-center rounded p-4">
                    <legend className="px-2 text-md text-dark-400">Faculty Information</legend>
                    <div className="grid grid-cols-1 max-w-full md:max-w-[400px] gap-y-[10px] text-sm py-[20px]">
                        <Row title="Faculty" value={detail?.faculty_name}/>
                        <Row title="Room No" value={detail?.room_no}/>
                        <Row title="Building No" value={detail?.building_no}/>
                        <Row title="Description" value={detail?.description}/>
                    </div>
                </fieldset>
                <fieldset className="border flex items-center justify-center rounded p-4">
                    <legend className="px-2 text-md text-dark-400">Marketing Coordinator Information</legend>
                    <div className="grid grid-cols-1 max-w-full md:max-w-[400px] gap-y-[10px] text-sm py-[20px]">
                        <Row title="Username" value={detail?.coordinator_name}/>
                        <Row title="Email" value={detail?.coordinator_email}/>
                        <Row title="Phone Number" value={detail?.coordinator_phone}/>
                    </div>
                </fieldset>
                {/* {id !== 'new' && <div className="grid grid-cols-1 w-full gap-4 md:grap-8 md:w-[300px] md:mx-auto">
                    <FilledButton title="Update" onClick={updateAccount}/>
                </div>} */}
            </div>
        </div>
    )
}

function Row({title, value}) {
    return (
        <div className="flex">
            <p className="w-[150px]">{title}</p>
            <div className="w-[25px]"/>
            <p className="w-[200px] font-bold">{value}</p> 
        </div>
    )
}

function Separator() {
    return <div className="w-[50px]"/>
}