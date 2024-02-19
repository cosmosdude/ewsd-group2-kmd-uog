import {Link} from "react-router-dom"

import TextField from "../components/TextField"

import "../style/tailwind.css"

export default () => {
    return (
        <>
            <nav className="flex items-center p-6 bg-slate-50">
                <h1 className="text-2xl font-bold">Large University</h1>
                <span className="ml-auto flex items-center gap-4">
                    <Link className="p-2 pl-4 pr-4 bg-slate-300 rounded" to="/signin">Sign In</Link>
                </span>
            </nav>
            <div className="flex mt-16">
                <div className="w-[350px] mx-auto inline-flex flex-col items-center gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <h1>Sign Up</h1>
                        <p>Sign up and read the selected articles.</p>
                    </div>
                    <TextField placeholder="username"/>
                    <TextField placeholder="email address"/>
                    <TextField placeholder="password"/>
                    <TextField placeholder="retype password"/>
                    <button className="mt-[25px] w-[150px] p-1 bg-purple-500 text-white rounded">Sign Up</button>
                </div>
            </div>
        </>
    )
}