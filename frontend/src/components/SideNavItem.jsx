import "../style/tailwind.css"

export default ({src, cta, onClick, selected}) => {
    return (
        <li className={`items-center ${selected ? 'bg-gray-300' : 'hover:bg-gray-200 transition-all' }`}>
            <button 
                className="flex items-center p-5 pl-10 pr-10 gap-3"
                onClick={(e)=>{
                    e.preventDefault()
                    onClick && onClick()
                }}
            >
                <img src={src} class="w-[30px] h-[30px] bg-slate-250"/>
                <p>{cta}</p>
            </button>
        </li>
    )
}