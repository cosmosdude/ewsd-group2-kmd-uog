import { Link, useNavigate } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import InputField from "../components/InputField"
import Dropdown from "../components/Dropdown"
import { useContext, useEffect, useState } from "react"
import LoadingIndicator from "../components/LoadingIndicator"
import { useAuthContext } from "../contexts/AuthContext"
import useEffectMagazines from "../hooks/useEffectMagazines"
import TableHeaderRow from "../components/TableHeaderRow"
import MagazineListItemRow from "../components/MagazineListItemRow"
import usePreviousMagazines from "../hooks/usePreviousMagazines"

const MagazineHistoryPage = () => {
    
    // let accessToken = useAuthContext();
    let navigate = useNavigate()
    let magazines = usePreviousMagazines()

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
                    <TableHeaderRow>
                        <th className="p-2 md:p-5 whitespace-nowrap">No</th>
                        <th className="p-2 md:p-5 whitespace-nowrap">Closure Name</th>
                        <th className="p-2 md:p-5 whitespace-nowrap">Start Date</th>
                        <th className="p-2 md:p-5 whitespace-nowrap">End Date</th>
                    </TableHeaderRow>
                    </thead>
                    <tbody>
                    {magazines.map((magazine, index) => {
                        return <MagazineListItemRow
                            key={magazine.id} 
                            index={index}
                            to={`${magazine.id}`}
                            magazine={magazine}
                            showClosureDate={false}
                        />
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