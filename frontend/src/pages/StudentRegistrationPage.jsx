import { Link } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"

const StudentRegistrationPage = () => {

    return (
        <div className="grow p-4 px-8">
            <div className="flex gap-2 items-center">
                <Breadcrumb 
                    className="py-2"
                    links={[
                        {name: "home", link: "/home"},
                        {name: "users", link: "/users"},
                        {name: "new registration", current: true},
                    ]}/>
                <span className="grow"/>
            </div>
        </div>
    )
}

export default StudentRegistrationPage