
import { useState } from "react"
import EyeSVG from "../assets/eyeopen.svg"
import "../style/tailwind.css"

const InputField = ({className, disabled, id, src, placeholder, type, value, onChange, error}) => {
    let secureTextEntry = type === 'password'
    let [secure, setSecure] = useState(true);

    let isDateOrDateTime = type === 'date' || type === 'datetime-local' || type=== 'time'

    return (
        <>
        <div className={`relative flex flex-col ${className ? className : ""}`}>
            <div className={`
            min-w-100 flex grow gap-2 px-[27.5px] py-[9px] items-center rounded-[4px] 
            border ${error && 'border-red-500'}
            focus-within:border-[#005F92] 
            bg-white transition-all`}>
                {src && <img src={src} className="w-[22px] h-[22px] inline-block rounded"/>}
                <input 
                // klasjdfkl
                    id={id}
                    type={secure ? type : 'text'}
                    disabled={disabled}
                    className={`grow peer focus:outline-none bg-transparent font-serif text-sm`} 
                    placeholder={placeholder}
                    value={value ? value : ""}
                    onChange={(e) => { 
                        onChange && onChange(e.target.value) 
                    }}
                />
                {isDateOrDateTime && !value && <p 
                    className="
                    peer-focus:invisible absolute 
                    inline-block py-2 left-4 right-10 
                    grow bg-white 
                    pointer-events-none 
                    font-serif text-sm text-gray-400
                    ">{placeholder}</p>}
                {secureTextEntry && <img src={EyeSVG} className={`w-[22px] h-[22px] inline-block rounded ${secure ? "opacity-100" : "opacity-50"}`} onClick={
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