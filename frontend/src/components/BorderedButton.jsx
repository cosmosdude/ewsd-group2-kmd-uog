import { useNavigate } from "react-router";

function BorderedButton({title, to, onClick}) {
    let navigate = useNavigate();

    return (
        <button 
            className="
            text-sm font-bold
            px-[22px] py-[10px] 
            border border-secondary-500
            bg-white
            rounded-full
            "
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

export default BorderedButton;