import {Link} from "react-router-dom"

import TextField from "../components/TextField"

import "../style/tailwind.css"

export default () => {
    return (
        <>
        <div className="block h-screen bg-slate-50">
                <nav className="flex items-center p-6 bg-slate-50">
                    <h1 className="text-2xl font-bold">Large University</h1>
                    <span className="ml-auto flex items-center gap-4">
                        <Link className="p-2 pl-4 pr-4 bg-slate-300 rounded hover:opacity-75 transition-all text-sm fond-bold" to="/signin">Sign In</Link>
                    </span>
                </nav>
                <div className="flex mt-16">
                    <div className="w-[325px] mx-auto inline-flex flex-col items-center gap-8">
                        <div className="flex flex-col items-center gap-2">
                            <h1 className="text-xl font-bold">Sign Up</h1>
                            <p className="text-sm">Sign up and read the selected articles.</p>
                        </div>
                        <TextField placeholder="username"/>
                        <TextField placeholder="email address"/>
                        <TextField placeholder="password"/>
                        <TextField placeholder="retype password"/>
                        <button className="text-xs font-bold mt-[25px] w-[150px] p-2 bg-purple-500 text-white rounded hover:opacity-75 transition-all">Sign Up</button>
                    </div>
                </div>
            </div>
        </>
    )
}