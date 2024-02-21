import "../style/tailwind.css"

export default ({title, subtitle, cta, onCTA}) => {

    return (
        <nav className="flex items-center p-6 bg-[#00476D]">
            <h1 className="text-2xl font-bold font-serif text-white">{title}</h1>
            <span className="ml-auto flex items-center gap-4">
                {subtitle && <h3 className="hidden md:block text-white font-serif">{subtitle}</h3>}
                <button 
                    className="p-2 pl-4 pr-4 text-white border-white border rounded-full hover:opacity-75 transition-all text-sm fond-bold font-serif" 
                    onClick={(e)=>{
                        e.preventDefault()
                        onCTA && onCTA()
                    }}
                >{cta}</button>
            </span>
        </nav>
    )
}