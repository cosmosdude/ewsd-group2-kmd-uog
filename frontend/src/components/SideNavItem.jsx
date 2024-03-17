import "../style/tailwind.css"

const SideNavItem = ({src, cta, onClick, selected}) => {
    return (
        <li className={`
        flex items-center bg-primary-300 
        border-secondary-500
        ${selected ? 'border-l-[5px]': 'border-l-[0px]'}
        rounded-tr-[4px]
        rounded-br-[4px]
        ${selected ? 'z-10 shadow-2xl': 'z-0 shadow-none'}
        ${selected ? 'text-secondary-500': 'text-black'}
        duration-300 transition-all
        `}>
            <button 
                className="flex items-center p-5 pl-10 pr-10 gap-3 grow font-serif hover:opacity-25 transition-all"
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