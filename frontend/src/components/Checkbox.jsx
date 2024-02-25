
import { useState } from "react"
import "../style/tailwind.css"

// import Checkmark from "../assets/checkmark.svg"

const Checkbox = ({icon, label, checked, onChange}) => {
    let base = "absolute pointer-events-none w-[16px] h-[16px] "
    let iconClass = base + (checked ? "block" : "hidden")
    return (
        <div className="flex items-center gap-2">
            <input  
                checked={checked}
                className={"w-[16px] h-[16px] transition-all rounded-[2px] border-2 border-slate-900 appearance-none checked:border-[#005F92] checked:bg-[#005F92]"}
                type="checkbox"
                onChange={(e) => { 
                    console.log("Target.checked", e.target.checked)
                    // if onChanger is valid
                    // pass new value
                    onChange && onChange(e.target.checked)
                }}
            />
            <img src={icon} className={iconClass} />
            <p className="font-serif text-sm">{label ? label : ""}</p>
        </div>
    )
}

export default Checkbox