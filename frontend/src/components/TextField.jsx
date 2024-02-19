
import "../style/tailwind.css"

export default ({placeholder}) => {
    return (
        <>
            <div className="w-full min-w-100 flex gap-2 p-1 pl-2 pr-2 items-center rounded border-2 focus-within:border-slate-400 bg-white transition-all ">
                <span className="w-[16px] h-[16px] inline-block bg-slate-100 rounded"></span>
                <input className="focus:outline-none bg-transparent" placeholder={placeholder}/>
            </div>
        </>
    )
}