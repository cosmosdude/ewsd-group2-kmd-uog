import "../style/tailwind.css"

import DownArrowSVG from "../assets/downarrow.svg"
import TickSVG from "../assets/tick.svg"
import { useState } from "react"

const Dropdown = ({
    className, title, index, onChange, options, disabled,
    modified
}) => {

    let [selected, setSelected] = useState(index);

    let items = options ? options : []

    return (
        <div className={`${!disabled && 'group'} flex relative justify-between ${className}`}>
            <div className={`
            ${disabled && 'pointer-events-none'} 
            inline-flex items-center w-full min-h-[44px] 
            border-1 border rounded-[4px] 
            ${modified ? 'px-[10px] py-[10px]' : 'px-[27.5px] py-[10px]'}
            hover:opacity-75 transition-all
            `}>
                <p className="font-serif text-sm grow text-left">{title && title}</p>
                <img className="w-[22px] h-[22px]" src={DownArrowSVG}/>
            </div>

            <ul className="absolute px-[4px] py-[4px] top-full inline-block w-full max-h-[200px] overflow-y-scroll invisible group-hover:visible bg-white border rounded shadow-xl">
                {!items && <li className="flex min-h-[38px] px-[4px] items-center justify-center text-xs text-[#808080] font-serif" >No options</li>}
                {items.map((option, index) => {
                    return (
                        <li key={index}
                            className="flex gap-[4px] min-h-[38px] px-[4px] items-center cursor-pointer hover:bg-slate-50 rounded"
                            onClick={() => { 
                                setSelected(index) 
                                onChange?.(option, index)
                            }}
                        >
                            <img className={`${(selected === index) ? "" : "invisible"} inline-block w-[14px] h-[14px]`} src={TickSVG}/>
                            <p className="text-xs font-serif">{option}</p>
                        </li>
                    )
                })}
                
            </ul>
        </div>
    )
}

export default Dropdown