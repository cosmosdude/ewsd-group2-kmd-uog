import {Link, useNavigate} from "react-router-dom"

import "../style/tailwind.css"
import { useContext, useEffect, useRef, useState } from "react"
import Breadcrumb from "../components/Breadcrumb"
import AuthContext from "../contexts/AuthContext"

const FacultiesPage = () => {
    let navigate = useNavigate()
    let accessToken = useContext(AuthContext);

    return (
        <div className="flex flex-col h-full p-4 px-8 gap-3 overflow-y-hidden">
            <div className="flex gap-2 items-center">
                <Breadcrumb 
                    className="py-2"
                    links={[
                        {name: "home", link: "/home"},
                        {name: "faculty", current: true}
                    ]}
                />
                <span className="grow"/>
                <button 
                    className="p-2 pl-8 pr-8 bg-purple-600 text-white rounded"
                    onClick={()=>{
                        navigate('new')
                    }}
                >
                    New Faculty
                </button>
            </div>
            <div className="block w-full h-full overflow-scroll">
                <table className="table-auto mx-0 md:w-full">
                    <thead>
                    <tr className="sticky bg-slate-100">
                        <th className="p-5">No</th>
                        <th className="p-5">Faculty</th>
                        <th className="p-5">Description</th>
                        <th className="p-5">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <div className="inline-block h-[50px]"></div>
                <div className="flex gap-2 absolute bottom-[25px] right-8 text-center">
                    <button className="inline-block w-[30px] h-[30px] bg-slate-200 rounded-full">
                        &lt;
                    </button>
                    <button className="inline-block w-[30px] h-[30px] bg-slate-200 rounded-full">
                        1
                    </button>
                    <button className="inline-block w-[30px] h-[30px] bg-slate-200 rounded-full">
                        &gt;
                    </button>
                </div>
            </div>

            
        </div>
    )
}
export default FacultiesPage