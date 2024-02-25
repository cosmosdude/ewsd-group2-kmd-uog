import {Link, useNavigate} from "react-router-dom"

import "../style/tailwind.css"
import { useContext, useEffect, useRef, useState } from "react"
import SideNav from "../components/SideNav"
import SideNavItem from "../components/SideNavItem"
import Breadcrumb from "../components/Breadcrumb"
import AuthContext from "../contexts/AuthContext"

function getUserRoleDisplayName(roleId) {
    switch (roleId) {
        case 1: return "Admin"
        case 2: return "Marketing Manager"
        case 3: return "Marketing Coordinator"
        case 4: return "Student"
        case 5: return "Guest"
        default: return "N/A"
    }
}

const UsersPage = () => {
    let navigate = useNavigate()

    let [searchText, setSearchText] = useState("");

    let accessToken = useContext(AuthContext);
    let [page, setPage] = useState(0);

    let [users, setUsers] = useState([])
    // let users = []
    let [filteredUsers, setFilteredUsers] = useState([]);

    function filterUsers() {
        setFilteredUsers(
            searchText 
            // if search text is not empty, filter it
            ? users.filter(user => user.name.toLowerCase().includes(searchText.toLowerCase()))
            // otherwise, take all users
            : [...users]
        )
    }

    async function fetchUsers() {
        let response = await fetch('http://127.0.0.1:8000/api/users', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        })
        try {
            console.log(response)
            let json = await response.json()
            setUsers(json.data.data)
            // users = json.data.data
            // filterUsers()
        } catch { }
        // setPage(Math.min(10, page + 1))
        return () => {}
    }

    useEffect(() => {
        fetchUsers()
    }, [page])

    useEffect(() => {
        filterUsers()
    }, [searchText, users])

    return (
        <div className="flex flex-col h-full p-4 px-8 gap-3 overflow-y-hidden">
            <div className="flex gap-2 items-center">
                <Breadcrumb 
                    className="py-2"
                    links={[
                        {name: "home", link: "/home"},
                        {name: "users", current: true}
                    ]}
                />
                <span className="grow"/>
                <button 
                    className="p-2 pl-8 pr-8 bg-purple-600 text-white rounded"
                    onClick={()=>{
                        navigate('new')
                    }}
                >
                    New Registration
                </button>
            </div>
            <div className="flex">
                <div className="inline-flex gap-2 p-1 border-2 mx-auto w-full md:w-auto rounded">
                    <div className="inline-block w-[25px] h-[25px] bg-slate-200 rounded"/>
                    <input 
                        className="outline-none grow md:grow-0 w-auto md:w-[300px] bg-transparent" 
                        type="text" 
                        placeholder="Search by username, role or faculty"
                        value={searchText}
                        onChange={(e) => { 
                            setSearchText(e.target.value)
                        }}
                    />
                    {/* <div className="grow"/> */}
                </div>
            </div>
            <div className="block w-full h-full overflow-scroll">
                <table className="table-auto mx-0 md:w-full">
                    <thead>
                    <tr className="sticky bg-slate-100">
                        <th className="p-5">No</th>
                        <th className="p-5">ID</th>
                        <th className="p-5">Name</th>
                        <th className="p-5">Email</th>
                        <th className="p-5">Faculty</th>
                        <th className="p-5">Role</th>
                        <th className="p-5">Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map((user, index) => {
                        return (
                            <tr key={index} className="text-center hover:bg-slate-100">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{user.id}</td>
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">N/A</td>
                                <td className="p-3">{getUserRoleDisplayName(user.role_id)}</td>
                                <td className="p-3">N/A</td>
                                <td className="p-3">
                                    <div className="group relative inline-flex bg-gray-100">
                                        <div className="inline-flex w-[25px] h-[25px] bg-slate-200 rounded">
                                        </div>
                                        <ul className="absolute flex flex-col gap-2 top-full right-0 z-10 p-2 px-4 shadow-xl invisible group-hover:visible bg-slate-100 rounded">
                                           <li><button className="hover:opacity-50">Detail</button></li> 
                                           <li><button className="hover:opacity-50">Update</button></li> 
                                           <li><button className="hover:opacity-50">Deactivate</button></li> 
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
export default UsersPage