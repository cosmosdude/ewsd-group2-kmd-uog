import {Link, useNavigate} from "react-router-dom"

import "../style/tailwind.css"
import { useEffect, useRef, useState } from "react"
import SideNav from "../components/SideNav"
import SideNavItem from "../components/SideNavItem"

export default () => {
    let navigate = useNavigate();

    function gotoSignIn() { navigate("signin") }

    useEffect(() => {
        if (!window.localStorage.getItem("accessToken")) gotoSignIn()
    })

    function logout() {
        window.localStorage.removeItem("accessToken", null)
        gotoSignIn()
    }

    return (
        <div className="h-screen flex bg-slate-50">
            {/* left side */}
            <SideNav>
                <SideNavItem cta="Dashboard 123" onClick={() => {navigate("/")}}/>
                <SideNavItem selected cta="Users"/>
                <SideNavItem cta="Faculty"/>
                <SideNavItem cta="Contributions"/>
                <SideNavItem cta="Logout" onClick={logout}/>
            </SideNav>
            {/* right
             side */}

            <detail className="grow">
                <span className="flex p-4 px-8 gap-2 items-center">
                    <Link to="/">home</Link><span>/</span><button disabled className="text-blue-400">users</button>
                    <span className="grow"/>
                    <button className="p-2 pl-8 pr-8 bg-purple-600 text-white rounded">New Registration</button>
                </span>
                <div className="flex items-center">
                    <div className="flex gap-3 bg-gray-200 rounded p-2 px-6 mx-4 grow md:grow-0 md:mx-auto">
                        <img className="w-[24px] h-[24px]"/>
                        <input 
                            className="appearance-none bg-transparent focus:outline-none grow md:w-[300px]"
                            type="text" 
                            placeholder="Search by username, role or faculty"
                        />
                    </div>
                </div>
                <div className="flex mt-[25px] p-8">
                    <div className="flex w-full items-center bg-gray-100 justify-center">
                        <table className="table-auto w-full">
                            <thead>
                                <tr className="bg-slate-100 border rounded">
                                    <th className="px-4 py-2 text-emerald-600">No</th>
                                    <th className="px-4 py-2 text-emerald-600">ID</th>
                                    <th className="px-4 py-2 text-emerald-600">Name</th>
                                    <th className="px-4 py-2 text-emerald-600">Faculty</th>
                                    <th className="px-4 py-2 text-emerald-600">Role</th>
                                    <th className="px-4 py-2 text-emerald-600">Status</th>
                                    <th className="px-4 py-2 text-emerald-600"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center">
                                    <td className="px-4 py-2 ">1</td>
                                    <td className="px-4 py-2 ">001</td>
                                    <td className="px-4 py-2 ">Naw Naw</td>
                                    <td className="px-4 py-2 ">IT</td>
                                    <td className="px-4 py-2 ">Student</td>
                                    <td className="px-4 py-2 ">Active</td>
                                    <td className="px-4 py-2 ">
                                        <span className="block w-[18px] h-[18px] bg-gray-900"></span>
                                    </td>
                                </tr>
                                <tr className="text-center">
                                    <td className="px-4 py-2 ">1</td>
                                    <td className="px-4 py-2 ">001</td>
                                    <td className="px-4 py-2 ">Naw Naw</td>
                                    <td className="px-4 py-2 ">IT</td>
                                    <td className="px-4 py-2 ">Student</td>
                                    <td className="px-4 py-2 ">Active</td>
                                    <td className="px-4 py-2 ">
                                        <span className="block w-[18px] h-[18px] bg-gray-900"></span>
                                    </td>
                                </tr>
                                <tr className="text-center">
                                    <td className="px-4 py-2 ">1</td>
                                    <td className="px-4 py-2 ">001</td>
                                    <td className="px-4 py-2 ">Naw Naw</td>
                                    <td className="px-4 py-2 ">IT</td>
                                    <td className="px-4 py-2 ">Student</td>
                                    <td className="px-4 py-2 ">Active</td>
                                    <td className="px-4 py-2 ">
                                        <span className="block w-[18px] h-[18px] bg-gray-900"></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </detail>
            {/* <h1>Welcome to Dashboard!</h1> */}
            {/* <button onClick={logout}>Logout</button> */}

        </div>
    )
}


