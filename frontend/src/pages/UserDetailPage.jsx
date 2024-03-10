import { useContext, useEffect, useState } from "react"
import Breadcrumb from "../components/Breadcrumb"

import MailIcon from "../assets/mail.svg"
import FacultyIcon from "../assets/sidenav/departments.png"
import PhoneIcon from "../assets/phone.png"
import HistoryIcon from "../assets/history.png"
import { useNavigate, useParams } from "react-router"
import AuthContext from "../contexts/AuthContext"

const UserDetailPage = () => {
    let navigate = useNavigate()
    let { id } = useParams()
    let accessToken = useContext(AuthContext)

    let [details, setUserDetails] = useState({
        "user_id": 24,
        "user_name": "Mr Admin",
        "user_email": "tha.student@yopmail.com",
        "faculty_name": "THA Faculty",
        "faculty_id": 1,
        "role_id": 4,
        "role_name": "student"
    })

    console.log('User Detail Page')
    console.log('User Id', id)

    async function fetchDetail() {
        console.log("Called: http://127.0.0.1:8000/api/users/${id}")
        let response = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json"
            }
        })
        try {
            console.log(response)
            let json = await response.json()
            console.log(json)
            if (response.status === 200) {
                if (!json.data) navigate('notfound')
                setUserDetails(json.data)
            } else if (response.status === 404) {     
                navigate('notfound')
            } 

        } catch (e) {
            console.log('Error', e)
        }
        return () => { }
    }

    useEffect(() => {
        fetchDetail() 
    }, [])

    return (
        <div className="flex flex-col h-full p-4 px-8 gap-3 overflow-y-scroll">
            <div className="flex gap-2 items-center">
                <Breadcrumb 
                    className="py-2"
                    links={[
                        {name: "home", link: "/home"},
                        {name: "users", link: -1},
                        {name: "details", current: true}
                    ]}
                />
                <span className="grow"/>
            </div>
            <div className="flex h-[150px] bg-gray-200">
                <div className="inline-block mx-auto z-10 w-[150px] h-[150px] bg-gray-500 rounded-full mt-[75px]"></div>
            </div>
            <div className="flex min-h-[75px] bg-transparent"/>
            <div className="inline-block mx-auto text-center">
                <h1 className="text-2xl font-bold">
                    {details && details.user_name}
                </h1>
                <p className="">
                    ID: {details && details.user_id}
                </p>
            </div>
            <div className="block mx-auto">
                <table className="table-fixed md:table-auto border-spacing-1">
                    <tbody>
                        <tr className="align-middle">
                            <td className="py-2">
                                <img className='inline-block min-w-[24px] min-h-[24px] w-[24px] h-[24px]' src={MailIcon}/>
                            </td>
                            <td  className="pl-2 pr-[10px] md:pr-[50px] font-bold">
                                <label>Email</label>
                            </td>
                            <td>
                                <label>{details && details.user_email}</label>
                            </td>
                        </tr>
                        <tr className="align-middle">
                            <td className="py-2">
                                <img className='inline-block w-[24px] h-[24px]' src={FacultyIcon}/>
                            </td>
                            <td  className="pl-2 pr-[10px] md:pr-[50px] font-bold">
                                <label>Faculty</label>
                            </td>
                            <td>
                                <label>{details && details.faculty_name}</label>
                            </td>
                        </tr>
                        <tr className="align-middle">
                            <td className="py-2">
                                <img className='inline-block w-[24px] h-[24px]' src={PhoneIcon}/>
                            </td>
                            <td  className="pl-2 pr-[10px] md:pr-[50px] font-bold">
                                <label>Phone</label>
                            </td>
                            <td>
                                <label>{details && details.phone}</label>
                            </td>
                        </tr>
                        <tr className="align-middle">
                            <td className="py-2"> 
                                <img className='inline-block w-[24px] h-[24px]' src={HistoryIcon}/>
                            </td>
                            <td  className="pl-2 pr-[10px] md:pr-[50px] font-bold">
                                <label>Last Accessed</label>
                            </td>
                            <td>
                                <label>N/A</label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}

export default UserDetailPage