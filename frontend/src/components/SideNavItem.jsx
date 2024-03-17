import "../style/tailwind.css"

const SideNavItem = ({src, cta, onClick, selected}) => {
    return (
        <li className={`
        flex items-center bg-primary-300 transition-all
        border-secondary-500
        ${selected ? 'border-l-[5px]': 'border-l-[0px]'}
        rounded-tr-[4px]
        rounded-br-[4px]
        hover:opacity-50
        ${selected ? 'z-10 shadow-2xl': 'z-0 shadow-none'}
        ${selected ? 'text-secondary-500': 'text-black'}
        `}>
            <button 
                className="flex items-center p-5 pl-10 pr-10 gap-3 grow font-serif"
                onClick={(e)=>{
                    e.preventDefault()
                    onClick && onClick()
                }}
            >
                <img src={src} className="w-[22px] h-[22px]"/>
                <p>{cta}</p>
            </button>
        </li>
    )
}

export default SideNavItem