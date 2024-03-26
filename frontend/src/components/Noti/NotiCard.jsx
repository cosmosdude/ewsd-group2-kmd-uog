import { useEffect } from "react";
// import LucideIcon from "../../lib/LucideIcon";
import CrossSVG from '../../assets/cross.svg'

function NotiCard({title, message, style = 'default', onDismiss}) {
    let bg = 'bg-primary-200'
    let border = 'border-primary-600'
    let fg = 'text-dark-500'

    if (style === 'danger') {
        bg = 'bg-red-50'
        border = 'border-red-200'
        fg = 'text-red-600'
    }

    // if (style === 'success') {
    //     bg = 'bg-success-100'
    //     border = 'border-success-200'
    //     fg = 'text-success-700'
    // }

    let timer
    const clearTimer = () => {
        clearTimeout(timer)
        timer = null
    }
    useEffect(() => {
        timer = setTimeout(() => {
            onDismiss()
        }, 5000)
        return () => clearTimer()
    }, [])

    return (
        <div className={`
            relative
            p-[10px] 
            flex items-start gap-[10px] 
            grow
            ${bg}
            border ${border} rounded-[6px]
            mt-[20px] mx-[20px]
            ${fg}
            shadow-md
            animate-noti-in
            `}
        >
            {/* <LucideIcon name="info" size={18}/> */}
            <div className="flex flex-col gap-[0px] grow">
                <h3 className=" text-sm font-bold ">{title ?? ' '}</h3>
                <p className="text-xs">{message ?? ' '}</p>
            </div>
            <button className="absolute right-[10px] top-[10px] hover:opacity-25 transition-all" onClick={e => {
                clearTimer()
                onDismiss?.(e)
            }}>
                {/* <LucideIcon name="x" size={18}/> */}
                <img className="w-[18px] h-[18px]" src={CrossSVG}/>
                {/* Dismiss */}
            </button>
        </div>
    );
}

export default NotiCard;