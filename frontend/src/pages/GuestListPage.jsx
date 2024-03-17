import {Link, useNavigate} from "react-router-dom"

import "../style/tailwind.css"
import { useContext, useEffect, useRef, useState } from "react"
import Breadcrumb from "../components/Breadcrumb"
import AuthContext from "../contexts/AuthContext"

import SearchIcon from "../assets/search.png"
import ThreeDotIcon from "../assets/threedots.png"
import useEffectUserDetail from "../hooks/useEffectUserDetail"
import TableHeaderRow from "../components/TableHeaderRow"

const GuestListPage = () => {
    let navigate = useNavigate()

    let [searchText, setSearchText] = useState("");

    let user = useEffectUserDetail()

    let accessToken = useContext(AuthContext);
    let [page, setPage] = useState(0);

    let [users, setUsers] = useState([])
    // let users = []
    let [filteredUsers, setFilteredUsers] = useState([]);

    function filterUsers() {
        setFilteredUsers(
            searchText 
            // if search text is not empty, filter it
            ? users.filter(user => user.guest_name.toLowerCase().includes(searchText.toLowerCase()))
            // otherwise, take all users
            : [...users]
        )
    }

    useEffect(() => {
        if (!user.faculty_id) return () => {}
        let aborter = new AbortController()
        async function fetchUsers() {
            try {
                let response = await fetch(`http://127.0.0.1:8000/api/faculties/${user.faculty_id}/guest-user`, {
                    signal: aborter.signal,
                    method: 'POST',
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
    }, [user.faculty_id])

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
                    <thead>
                        <TableHeaderRow>
                            <th className="p-5">No</th>
                            <th className="p-5">Name</th>
                            <th className="p-5">Email</th>
                            <th className="p-5">Last Access</th>
                            <th></th>
                        </TableHeaderRow>
                    </thead>
                    <tbody>
                    {filteredUsers.map((user, index) => {
                        return (
                            <tr key={index} className="text-center hover:bg-slate-100">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{user.guest_name}</td>
                                <td className="p-3">{user.guest_email}</td>
                                <td className="p-3">N/A</td>
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
                                                            navigate(`/users/${user.guest_id ? user.guest_id : ''}`) 
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
export default GuestListPage