import DownArrowIcon from "../assets/downarrow.png"

export default function TopNav({onNav, onProfile, onLogout}) {
    return (
        <div className="shrink-0 flex gap-1 items-center w-full pl-[12.5px] pr-[25px] py-[12.5px] bg-secondary-700">
            <button className="block md:hidden" onClick={onNav}>
                <img className="w-[38px] h-[38px] bg-slate-100"/>
            </button>
            <header className="inline-block md:w-[250px] text-center font-serif text-md font-bold text-white">Large University</header>
            <div className="grow"/>
            <div className="group relative gap-1 flex items-center">
                <div className="flex items-center gap-[8px] hover:opacity-25 transition-all">
                    <div className="bg-slate-100 w-[44px] h-[44px] rounded-full cursor-pointer"/>
                    {/* <div className="bg-slate-100 w-[18px] h-[18px] rounded-full"/> */}
                    <img src={DownArrowIcon} className="w-[24px] h-[24px] rounded-full"/>
                </div>
                

                <div className="invisible group-hover:visible absolute right-0 top-full bg-transparent py-2 z-40 rounded">
                    <ul className="flex flex-col gap-2 px-4 py-2 bg-white border rounded">
                        <li><button onClick={onProfile}>Profile</button></li>
                        <li><button onClick={onLogout}>Logout</button></li>
                    </ul>
                </div>
            </div>
            
        </div>
    )
}