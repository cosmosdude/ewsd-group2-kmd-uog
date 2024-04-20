import { Link } from "react-router-dom"
import ThreeDotIcon from "../assets/threedots.png"
import { fastformat } from "../util/fastformat"

function MagazineListItemRow({
    index = 0, magazine, 
    to,
    showOptions,
    showClosureDate = true,
    onUpdate,
}) {

    function makeDate(str) {
        let date = new Date(str)
        return isNaN(date) ? new Date() : date    
    }

    let start = fastformat(makeDate(magazine.start_date), "d MMM yyyy")

    let closure = fastformat(makeDate(magazine.closure_date), "d MMM yyyy")

    let final = fastformat(makeDate(magazine.final_closure_date), "d MMM yyyy")


    return (
        <tr className="text-center hover:bg-slate-100 font-serif text-sm">
            <td className="p-3 whitespace-nowrap">{index + 1}</td>
            <td className="p-3 underline font-semibold decoration-3 decoration-gray-400 whitespace-nowrap">
                <Link to={to}>{magazine.name}</Link>
            </td>
            <td className="p-3 whitespace-nowrap">{start}</td>
            {showClosureDate && <td className="p-3">{closure}</td>}
            <td className="p-3 whitespace-nowrap">{final}</td>
            {showOptions && <td className="p-3">
                <div className="group relative inline-flex bg-gray-100">
                    <div className="inline-flex w-[25px] h-[25px] rounded hover:bg-slate-200 cursor-pointer">
                        <img className="m-1" src={ThreeDotIcon}/>
                    </div>
                    <ul className="absolute flex flex-col gap-2 top-full p-2 right-0 z-10 shadow-xl invisible group-hover:visible bg-slate-100 rounded">
                        <li>
                            <button 
                                className="inline-block text-sm font-bold rounded w-full h-full hover:bg-gray-200 p-2"
                                onClick={onUpdate}
                            >
                                Update
                            </button>
                        </li> 
                    </ul>
                </div>
            </td>}
        </tr>
    );
}

export default MagazineListItemRow;