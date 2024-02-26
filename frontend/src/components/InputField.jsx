
import { useState } from "react"
import EyeSVG from "../assets/eyeopen.svg"
import "../style/tailwind.css"

const InputField = ({className, id, src, placeholder, type, value, onChange, error}) => {
    let secureTextEntry = type === 'password'
    let [secure, setSecure] = useState(true);
    return (
        <>
        <div className={`flex flex-col ${className ? className : ""}`}>
            <div className={`
            min-w-100 flex grow gap-2 p-2 pl-4 pr-2 items-center rounded 
            border ${error && 'border-red-500'}
            focus-within:border-[#005F92] 
            bg-white transition-all`}>
                {src && <img src={src} className="w-[20px] h-[20px] inline-block rounded"/>}
                <input 
                // klasjdfkl
                    id={id}
                    type={secure ? type : 'text'}
                    className="grow focus:outline-none bg-transparent font-serif" 
                    placeholder={placeholder}
                    value={value ? value : ""}
                    onChange={(e) => { 
                        onChange && onChange(e.target.value) 
                    }}
                />
                {secureTextEntry && <img src={EyeSVG} className={`w-[20px] h-[20px] inline-block rounded ${secure ? "opacity-100" : "opacity-50"}`} onClick={
                    () => {
                        setSecure(!secure)
                    }
                }/>}
            </div>
            {error && <p className="text-red-500 text-sm font-serif">{error}</p>}
        </div>
        </>
    )
}

export default InputField