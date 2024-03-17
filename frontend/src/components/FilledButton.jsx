import { useNavigate } from "react-router";

export default function FilledButton({title, to, onClick, gray}) {
    let navigate = useNavigate();

    return (
        <button 
            className={`
            text-sm font-bold
            px-[22px] py-[10px] 
             text-white
            ${gray ? 'bg-dark-200' : 'bg-secondary-500'}
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