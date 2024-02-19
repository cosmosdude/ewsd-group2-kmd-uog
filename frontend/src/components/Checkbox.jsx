
import { useState } from "react"
import "../style/tailwind.css"

// import Checkmark from "../assets/checkmark.svg"

export default ({icon, label, checked, onChange}) => {

    let [isChecked, setIsChecked] = useState(checked);

    let base = "absolute pointer-events-none w-[18px] h-[18px] "
    let iconClass = base + (isChecked ? "block" : "hidden")
    return (
        <div className="flex items-center gap-2">
            <input 
                // checked={isChecked} 
                value={isChecked}
                className={"w-[18px] h-[18px] transition-all rounded border-2 border-slate-200 appearance-none " + (isChecked ? "bg-slate-200" : "") }
                type="checkbox"
                onChange={() => { 
                    setIsChecked(!isChecked)
                    // if onChanger is valid
                    // pass new value
                    onChange && onChange(!isChecked)
                }}
            />
            <img src={icon} className={iconClass} />
            <p className="text-sm">{label ? label : ""}</p>
        </div>
    )
}