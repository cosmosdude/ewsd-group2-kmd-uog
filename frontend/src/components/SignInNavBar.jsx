import "../style/tailwind.css"

const SignInNavBar = ({title, subtitle, cta, onCTA}) => {

    return (
        <nav className="flex items-center px-[28.5px] py-[14.5px] bg-[#00476D]">
            <h1 className="text-lg font-bold font-serif text-white">{title}</h1>
            <span className="ml-auto flex items-center gap-4">
                {subtitle && <h3 className="hidden md:block text-dark-150 font-serif text-sm">{subtitle}</h3>}
                <button 
                    className="px-[25px] py-[10px] text-white border-secondary-500 border rounded-full hover:opacity-75 transition-all text-xs fond-bold font-serif" 
                    onClick={(e)=>{
                        e.preventDefault()
                        onCTA && onCTA()
                    }}
                >{cta}</button>
            </span>
        </nav>
    )
}
export default SignInNavBar