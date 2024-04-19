import {Link, useNavigate} from "react-router-dom"

import "../style/tailwind.css"
import { useContext, useEffect, useRef, useState } from "react"
import Breadcrumb from "../components/Breadcrumb"

import SearchIcon from "../assets/search.png"
import ThreeDotIcon from "../assets/threedots.png"
import TableHeaderRow from "../components/TableHeaderRow"
import BorderedButton from "../components/BorderedButton"
import apiConfig from "../configs/api.config"
import { useAuthContext } from "../contexts/AuthContext"

const UsersPage = () => {
    let navigate = useNavigate()

    let [searchText, setSearchText] = useState("");

    let accessToken = useAuthContext();
    let [page, setPage] = useState(0);

    let [users, setUsers] = useState([])
    // let users = []
    let [filteredUsers, setFilteredUsers] = useState([]);

    function filterUsers() {
        setFilteredUsers(
            searchText 
            // if search text is not empty, filter it
            ? users.filter(matches)
            // otherwise, take all users
            : [...users]
        )
    }

    function matches(user) {
        let text = searchText.toLowerCase()
        // If name matches
        if (user?.user_name?.toLowerCase().includes(text)) return true
        // If email matches
        if (user?.user_email?.toLowerCase().includes(text)) return true
        // if role matches
        if (user?.role_name?.toLowerCase().includes(text)) return true
        // if faculty matches
        if (user?.faculty_names.filter(x => x.toLowerCase().includes(text)).length !== 0 )
        return true

        return false
    }

    useEffect(() => {
        let aborter = new AbortController()
        async function fetchUsers() {
            try {
                let response = await fetch(
                    apiConfig.path.users(), {
                    signal: aborter.signal,
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
        fetchUsers()

        return () => aborter.abort()
    }, [])

    useEffect(() => {
        filterUsers()
    }, [searchText, users])

    return (
        <div className="flex flex-col h-full p-4 px-8 gap-8 overflow-y-hidden">
            <div className="flex gap-2 items-center">
                <Breadcrumb 
                    className="py-2"
                    links={[
                        {name: "home", link: "/home"},
                        {name: "users", current: true}
                    ]}
                />
                <span className="grow"/>
                <BorderedButton title="New Registration" to="new"/>
            </div>
            <div className="flex">
                <div className="inline-flex items-center gap-2 px-[18px] py-[7px] mx-auto w-full md:w-auto rounded-[8px] bg-primary-400">
                    <img src={SearchIcon} className="inline-block w-[18px] h-[18px]"/>
                    <input 
                        className="outline-none grow md:grow-0 w-auto md:w-[300px] bg-transparent font-serif font-sm" 
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
                    <thead className="sticky top-0 z-[1]">
                        <TableHeaderRow>
                            <th className="p-5">No</th>
                            <th className="p-5">ID</th>
                            <th className="p-5">Name</th>
                            <th className="p-5">Email</th>
                            <th className="p-5">Faculty</th>
                            {/* <th className="p-5">Role</th> */}
                            <th className="p-5">Last Access</th>
                            <th></th>
                        </TableHeaderRow>
                    </thead>
                    <tbody className="font-serif text-sm">
                    {filteredUsers.map((user, index) => {
                        return (
                            <tr key={index} className="text-center hover:bg-slate-100">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{user.user_id}</td>
                                <td className="p-3">{user.user_name}</td>
                                <td className="p-3">{user.user_email}</td>
                                <td className="p-3">{user.faculty_names.join(',')}</td>
                                {/* <td className="p-3">{user.role_name}</td> */}
                                <td className="p-3">{user.last_login_time}</td>
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
                                                            navigate(`/users/${user.user_id ? user.user_id : ''}`) 
                                                        }
                                                    }
                                                >
                                                    Detail
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
export default UsersPage