import { useContext, useEffect, useState } from "react"
import Breadcrumb from "../components/Breadcrumb"

import MailIcon from "../assets/mail.svg"
import FacultyIcon from "../assets/sidenav/departments.svg"
import PhoneIcon from "../assets/phone.png"
import HistoryIcon from "../assets/history.png"
import { useNavigate, useParams } from "react-router"
import { useAuthContext } from "../contexts/AuthContext"
import apiConfig from "../configs/api.config"

import {profile} from "../assets/profile/profile"


const UserDetailPage = () => {
    let navigate = useNavigate()
    let { id } = useParams()
    let accessToken = useAuthContext()

    let [details, setUserDetails] = useState({
        "user_id": 24,
        "user_name": "Mr Admin",
        "user_email": "tha.student@yopmail.com",
        "user_phone": "123",
        "faculty_name": [],
        "role_name": "student",
        "user_last_access_time": "8 hours and 57 minutes ago"
    })

    console.log('User Detail Page')
    console.log('User Id', id)

    async function fetchDetail() {
        console.log("Called: http://127.0.0.1:8000/api/users/${id}")
        let response = await fetch(apiConfig.path.userDetail(id), {
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
            <div className="flex h-[192px] bg-gradient-to-r from-secondary-200 to-secondary-600">
                <img 
                    src={profile(details?.user_id)}
                    className="inline-block mx-auto z-10 w-[150px] h-[150px] rounded-full mt-[100px]"/>
            </div>
            <div className="flex min-h-[75px] bg-transparent"/>
            <div className="inline-block mx-auto text-center">
                <h1 className="text-2xl font-bold">
                    {details?.user_name ?? "'"}
                </h1>
                <p className="">
                    ID: {details?.user_id ?? ""}
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
                                <label>{details?.user_email ?? ""}</label>
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
                                <label>{details?.faculty_name.join(", ") ?? ""}</label>
                            </td>
                        </tr>
                        {details?.user_phone && <tr className="align-middle">
                            <td className="py-2">
                                <img className='inline-block w-[24px] h-[24px]' src={PhoneIcon}/>
                            </td>
                            <td  className="pl-2 pr-[10px] md:pr-[50px] font-bold">
                                <label>Phone</label>
                            </td>
                            <td>
                                <label>{details?.user_phone ?? ""}</label>
                            </td>
                        </tr>}
                        <tr className="align-middle">
                            <td className="py-2"> 
                                <img className='inline-block w-[24px] h-[24px]' src={HistoryIcon}/>
                            </td>
                            <td  className="pl-2 pr-[10px] md:pr-[50px] font-bold">
                                <label>Last Accessed</label>
                            </td>
                            <td>
                                <label>{details?.user_last_access_time ?? ""}</label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}

export default UserDetailPage