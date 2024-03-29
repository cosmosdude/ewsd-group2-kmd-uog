import { Link, useNavigate } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import InputField from "../components/InputField"
import Dropdown from "../components/Dropdown"
import { useContext, useEffect, useState } from "react"
import LoadingIndicator from "../components/LoadingIndicator"
import AuthContext from "../contexts/AuthContext"
import useEffectMagazines from "../hooks/useEffectMagazines"

const MagazineHistoryPage = () => {
    
    // let accessToken = useContext(AuthContext);
    let navigate = useNavigate()
    let magazines = useEffectMagazines()

    return (
        <div className="flex flex-col gap-8 w-full h-full p-4 px-8 overflow-y-hidden">
            <div className="flex gap-2 items-center">
                <Breadcrumb 
                    className="py-2"
                    links={[
                        {name: "home", link: "/home"},
                        {name: "magazines", link: "/contribution"},
                        {name: "previous", current: true},
                    ]}/>
                <span className="grow"/>
            </div>
            <div className="block w-full h-full overflow-scroll">
                <table className="table-auto mx-0 md:w-full">
                    <thead>
                    <tr className="sticky bg-slate-100">
                        <th className="p-5">No</th>
                        <th className="p-5">Closure Name</th>
                        <th className="p-5">Start Date</th>
                        <th className="p-5">End Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {magazines.map((magazine, index) => {
                        return (
                            <tr key={index} className="text-center hover:bg-slate-100">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3 underline text-violet-500 font-semibold decoration-3 decoration-gray-400">
                                    <Link to={`${magazine.id}`}>{magazine.name}</Link>
                                </td>
                                <td className="p-3">{magazine.start_date}</td>
                                <td className="p-3">{magazine.final_closure_date}</td>
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

export default MagazineHistoryPage