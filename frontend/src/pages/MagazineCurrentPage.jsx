import { Link, useNavigate, useParams } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import InputField from "../components/InputField"
import Dropdown from "../components/Dropdown"
import { useContext, useEffect, useState } from "react"
import LoadingIndicator from "../components/LoadingIndicator"
import AuthContext from "../contexts/AuthContext"

import ThreeDotIcon from "../assets/threedots.png"
import useEffectUserDetail from "../hooks/useEffectUserDetail"
import useEffectCurrentMagazines from "../hooks/useEffectCurrentMagazines"

/**
 * # Used for
 * Current Magazine (Admin) <- New Magazine, Name unclickable
 * Submit
 * */

const MagazineCurrentPage = () => {
    
    let accessToken = useContext(AuthContext);
    let navigate = useNavigate()

    let user = useEffectUserDetail()
    let isAdmin = user.role_name == 'administrator'
    let isStudent = ['student'].includes(user.role_name)
    let magazines = useEffectCurrentMagazines()

    return (
        <div className="flex flex-col gap-8 w-full h-full p-4 px-8 overflow-y-hidden">
            <div className="flex gap-2 items-center">
                <Breadcrumb 
                    className="py-2"
                    links={[
                        {name: "home", link: "/home"},
                        {name: "magazines", link: "/contribution"},
                        {name: "current", current: true},
                    ]}/>
                <span className="grow"/>
                { isStudent && <Link 
                    className="p-2 pl-8 pr-8 text-purple-500 font-bold rounded"
                    to='history'
                >
                    History
                </Link>}

                { isAdmin && <Link 
                    className="p-2 pl-8 pr-8 bg-purple-600 text-white rounded"
                    to='new'
                >
                    New Magazine
                </Link>}
            </div>
            <div className="block w-full h-full overflow-scroll">
                <table className="table-auto mx-0 md:w-full">
                    <thead>
                    <tr className="sticky bg-slate-100">
                        <th className="p-5">No</th>
                        <th className="p-5">Closure Name</th>
                        <th className="p-5">Start Date</th>
                        <th className="p-5">Closure Date</th>
                        <th className="p-5">Final Closure Date</th>
                        {isAdmin && <th className="p-5">Action</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {magazines.map((magazine, index) => {
                        return (
                            <tr key={index} className="text-center hover:bg-slate-100">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">
                                    <Link to ={`${magazine.id}/view`}>{magazine.name}</Link>
                                </td>
                                <td className="p-3">{magazine.start_date}</td>
                                <td className="p-3">{magazine.closure_date}</td>
                                <td className="p-3">{magazine.final_closure_date}</td>
                                {isAdmin && <td className="p-3">
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
                                                            console.log("Magazine id", magazine.id && magazine.id)
                                                            navigate(`/magazine/current/${magazine.id ? magazine.id : ''}`) 
                                                        }
                                                    }
                                                >
                                                    Update
                                                </button>
                                            </li> 
                                        </ul>
                                    </div>
                                </td>}
                            </tr>
                        )
                    }) }
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

export default MagazineCurrentPage