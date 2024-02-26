import {Link, useNavigate} from "react-router-dom"

import "../style/tailwind.css"
import { useContext, useEffect, useRef, useState } from "react"
import Breadcrumb from "../components/Breadcrumb"
import AuthContext from "../contexts/AuthContext"

import ThreeDotIcon from "../assets/threedots.png"

const AcademicYearPage = () => {

    let navigate = useNavigate()

    let accessToken = useContext(AuthContext);
    let [page, setPage] = useState(0);

    let [users, setUsers] = useState([])

    async function fetchUsers() {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/users', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json'
                }
            })

            let json = await response.json()
            if (response.status === 200) {
                setUsers(json.data)
            }
        } catch { }
        return () => {}
    }

    useEffect(() => {
        fetchUsers()
    }, [page])

    return (
        <div className="flex flex-col h-full p-4 px-8 gap-8 overflow-y-hidden">
            <div className="flex gap-2 items-center">
                <Breadcrumb 
                    className="py-2"
                    links={[
                        {name: "home", link: "/home"},
                        {name: "academic year", current: true}
                    ]}
                />
                <span className="grow"/>
                <button 
                    className="p-2 pl-8 pr-8 bg-purple-600 text-white rounded"
                    onClick={()=>{
                        navigate('new')
                    }}
                >
                    New Academic Year
                </button>
            </div>
            <div className="block w-full h-full overflow-scroll">
                <table className="table-auto mx-0 md:w-full">
                    <thead>
                    <tr className="sticky bg-slate-100">
                        <th className="p-5">No</th>
                        <th className="p-5">Academic Year</th>
                        <th className="p-5">Start Date</th>
                        <th className="p-5">End Date</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => {
                        return (
                            <tr key={index} className="text-center hover:bg-slate-100">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{user.user_name}</td>
                                <td className="p-3">{user.user_email}</td>
                                <td className="p-3">{user.faculty_name}</td>
                                <td className="p-3">
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
                                                            console.log("User id", user.user_id && user.user_id)
                                                            navigate(`/academicyear/${user.user_id ? user.user_id : ''}`) 
                                                        }
                                                    }
                                                >
                                                    Update
                                                </button>
                                            </li> 
                                            <li>
                                                <button 
                                                    className="inline-block text-sm font-bold rounded w-full h-full hover:bg-gray-200 p-2"
                                                    onClick={
                                                        () => { 
                                                            console.log("User id", user.user_id && user.user_id)
                                                            navigate(`/academicyear/${user.user_id ? user.user_id : ''}`) 
                                                        }
                                                    }
                                                >
                                                    Delete
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
export default AcademicYearPage