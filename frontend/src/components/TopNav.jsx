import DownArrowIcon from "../assets/downarrow.png"
import { profile } from "../assets/profile/profile"
import useEffectUserDetail from "../hooks/useEffectUserDetail"

export default function TopNav({allowHamburger, onNav, userId, onProfile, onLogout}) {

    console.log("Allow Hamburger", allowHamburger)
    return (
        <div className="z-[10005] shrink-0 flex gap-[10px] items-center w-full pl-[12.5px] pr-[25px] py-[12.5px] bg-secondary-700">
            {allowHamburger && <button className="flex flex-col gap-[4px] items-center justify-center md:hidden w-[30px] h-[30px] border rounded" onClick={onNav}>
                {/* <img className=""/> */}
                <div className="w-[15px] h-[2px] bg-white"/>
                <div className="w-[15px] h-[2px] bg-white"/>
                <div className="w-[15px] h-[2px] bg-white"/>
            </button>}
            <header className="inline-block md:w-[250px] text-center font-serif text-md font-bold text-white">Large University</header>
            <div className="grow"/>
            <div className="group relative gap-1 flex items-center">
                <div className="flex items-center gap-[8px] hover:opacity-25 transition-all">
                    <img 
                        className=" w-[44px] h-[44px] rounded-full"
                        src={profile(userId)}
                    />
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