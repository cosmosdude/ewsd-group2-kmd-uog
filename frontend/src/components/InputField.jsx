
import { useState } from "react"
import EyeSVG from "../assets/eyeopen.svg"
import "../style/tailwind.css"

export default ({className, src, placeholder, type}) => {
    let secureTextEntry = type === 'password'
    let [secure, setSecure] = useState(true);
    return (
        <>
            <div className={`${className ? className : ""} min-w-100 flex gap-2 p-2 pl-4 pr-2 items-center rounded border focus-within:border-[#005F92] bg-white transition-all`}>
                {src && <img src={src} className="w-[20px] h-[20px] inline-block rounded"/>}
                <input 
                // klasjdfkl
                    type={secure ? type : 'text'}
                    className="grow focus:outline-none bg-transparent font-serif" 
                    placeholder={placeholder}/>
                {secureTextEntry && <img src={EyeSVG} className={`w-[20px] h-[20px] inline-block rounded ${secure ? "opacity-100" : "opacity-50"}`} onClick={
                    () => {
                        setSecure(!secure)
                    }
                }/>}
            </div>
        </>
    )
}