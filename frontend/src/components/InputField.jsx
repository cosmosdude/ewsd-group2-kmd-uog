
import { useState } from "react"
import EyeSVG from "../assets/eyeopen.svg"
import "../style/tailwind.css"

const InputField = ({className, id, src, placeholder, type, value, onChange, error}) => {
    let secureTextEntry = type === 'password'
    let [secure, setSecure] = useState(true);

    let isDateOrDateTime = type === 'date' || type === 'datetime-local' || type=== 'time'

    return (
        <>
        <div className={`relative flex flex-col ${className ? className : ""}`}>
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
                    className={`grow peer focus:outline-none bg-transparent font-serif`} 
                    placeholder={placeholder}
                    value={value ? value : ""}
                    onChange={(e) => { 
                        onChange && onChange(e.target.value) 
                    }}
                />
                {isDateOrDateTime && !value && <p className="peer-focus:invisible absolute inline-block py-2 left-4 right-10 grow bg-white pointer-events-none font-serif text-gray-400">{placeholder}</p>}
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