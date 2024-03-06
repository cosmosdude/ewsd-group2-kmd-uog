export default function TopNav({onProfile, onLogout}) {
    return (
        <div className="shrink-0 flex items-center w-full p-2 pr-8">
            <header className="inline-block w-[250px] text-center text-xl font-bold">Large University</header>
            <div className="grow"/>
            <div className="group relative gap-1 flex items-center ">
                <div className="bg-slate-100 w-[44px] h-[44px] rounded-full cursor-pointer"/>
                <div className="bg-slate-100 w-[18px] h-[18px] rounded-full"/>

                <div className="invisible group-hover:visible absolute right-0 top-full bg-transparent py-2">
                    <ul className="flex flex-col gap-2 px-4 py-2 bg-white border">
                        <li><button onClick={onProfile}>Profile</button></li>
                        <li><button onClick={onLogout}>Logout</button></li>
                    </ul>
                </div>
            </div>
            
        </div>
    )
}