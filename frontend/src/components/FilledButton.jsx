import { useNavigate } from "react-router";

export default function FilledButton({
    className, title, to, onClick, gray, style
}) {
    let navigate = useNavigate();

    let bgStyle = 'bg-secondary-500'
    if (style === 'gray' || gray) bgStyle = "bg-dark-200"
    else if (style === 'danger') bgStyle = "bg-red-800"

    return (
        <button 
            className={`
            ${className ?? ''}
            text-sm font-bold
            px-[12px] py-[8px] 
             text-white
            ${bgStyle}
            rounded-full
            `}
            onClick={(e)=>{
                // navigate('new')
                if (to) navigate(to)
                onClick?.(e)
            }}
        >
            {title}
        </button>
    );
}