import {Link, useNavigate} from "react-router-dom"

import "../style/tailwind.css"
import { useContext, useEffect, useRef, useState } from "react"
import Breadcrumb from "../components/Breadcrumb"
import { useAuthContext } from "../contexts/AuthContext"
import useEffectAllFaculties from "../hooks/useEffectAllFaculties"

import ThreeDotIcon from "../assets/threedots.png"
import TableHeaderRow from "../components/TableHeaderRow"
import BorderedButton from "../components/BorderedButton"
import { usePushNoti } from "../components/Noti/NotiSystem"

const FacultiesPage = () => {
    let pushNoti = usePushNoti()
    let navigate = useNavigate()
    let accessToken = useAuthContext();

    let [faculties, error] = useEffectAllFaculties()
    // useEffect(() => {
    //     if (error) {

    //     }
    // }, error)

    return (
        <div className="flex flex-col h-full p-4 px-8 gap-8 overflow-y-hidden">
            <div className="flex gap-2 items-center">
                <Breadcrumb 
                    className="py-2"
                    links={[
                        {name: "home", link: "/home"},
                        {name: "faculty", current: true}
                    ]}
                />
                <span className="grow"/>
                <BorderedButton
                    title="New Faculty"
                    to="new"
                />
                {/* <button 
                    className="
                    text-sm font-bold
                    px-[12px] py-[10px] 
                    border border-secondary-500
                    bg-white
                    rounded-full
                    "
                    onClick={()=>{
                        navigate('new')
                    }}
                >
                    New Faculty
                </button> */}
            </div>
            <div className="block w-full h-full overflow-scroll">
                <table className="table-auto mx-0 md:w-full">
                    <thead>
                        <TableHeaderRow>
                            <th className="p-2 md:p-5 whitespace-nowrap">No</th>
                            <th className="p-2 md:p-5 whitespace-nowrap">Faculty</th>
                            <th className="p-2 md:p-5 whitespace-nowrap">Marketing Coordinator</th>
                            <th className="p-2 md:p-5 whitespace-nowrap">Actions</th>
                        </TableHeaderRow>
                    </thead>
                    <tbody>
                    {faculties.map((faculty, index) => {
                        return (
                            <tr key={index} className="text-center font-serif text-sm hover:bg-slate-100">
                                <td className="p-3 whitespace-nowrap">{index + 1}</td>
                                <td className="p-3 whitespace-nowrap">{faculty.name}</td>
                                <td className="p-3 whitespace-nowrap">{faculty.email}</td>
                                <td className="p-3 whitespace-nowrap">
                                    <div className="group relative inline-flex bg-gray-100">
                                        <div className="inline-flex w-[25px] h-[25px] rounded hover:bg-slate-200 cursor-pointer">
                                            <img className="m-1" src={ThreeDotIcon}/>
                                        </div>
                                        <ul className="absolute flex flex-col gap-2 top-full p-2 right-0 z-10 shadow-xl invisible group-hover:visible bg-slate-100 rounded">
                                            <li>
                                                <button 
                                                    className="inline-block text-sm font-bold rounded w-full h-full hover:bg-gray-200 p-2"
                                                    onClick={
                                                        () => { 
                                                            if (faculty.id) navigate(`/faculty/${faculty.id}/detail`) 
                                                        }
                                                    }
                                                >
                                                    Detail
                                                </button>
                                            </li> 
                                           <li>
                                                <button 
                                                    className="inline-block text-sm font-bold rounded w-full h-full hover:bg-gray-200 p-2"
                                                    onClick={
                                                        () => { 
                                                            if (faculty.id) navigate(`/faculty/${faculty.id}`) 
                                                        }
                                                    }
                                                >
                                                    Update
                                                </button>
                                            </li> 
                                        </ul>
                                    </div>
                                    
                                </td>
                            </tr>
                        )
                    }) }
                    </tbody>
                </table>
                <div className="inline-block h-[50px]"></div>
                {/* <div className="flex gap-2 absolute bottom-[25px] right-8 text-center">
                    <button className="inline-block w-[30px] h-[30px] bg-slate-200 rounded-full">
                        &lt;
                    </button>
                    <button className="inline-block w-[30px] h-[30px] bg-slate-200 rounded-full">
                        1
                    </button>
                    <button className="inline-block w-[30px] h-[30px] bg-slate-200 rounded-full">
                        &gt;
                    </button>
                </div> */}
            </div>

            
        </div>
    )
}
export default FacultiesPage