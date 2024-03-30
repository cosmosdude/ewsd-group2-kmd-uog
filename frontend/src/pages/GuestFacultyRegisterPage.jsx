import { useNavigate } from "react-router";

import CrossSVG from "../assets/cross.svg"

function GuestFacultyRegisterPage() {

    let navigate = useNavigate()

    return (
        <div 
        className="
        fixed 
        left-0 top-0 
        z-[1000]
        flex w-screen h-screen bg-black/90 p-[25px] md:px-[150px] md:py-[50px] overflow-hidden
        "
        onClick={e => {
            e.stopPropagation()
            e.preventDefault()
            navigate(-1)
        }}
    >
        <div className="my-auto w-full mx-[20px] md:mx-[100px] bg-white rounded-[14px] overflow-hidden">
            <div className="relative flex py-[24px] bg-secondary-200">
                <p className="m-auto text-lg font-bold">Subscribe Faculty</p>
                <button className="absolute right-[24px] my-auto hover:opacity-25 transition-all">
                    <img src={CrossSVG} className="w-[24px] h-[24px]"/>
                </button>
            </div>
            <div className="flex flex-col py-[24px]">
                <p className="mx-auto">
                    Subscribe your interested faculty to read the published contributions.
                </p>
                <div className="">

                </div>
            </div>
        </div>
    </div>
    );
}

export default GuestFacultyRegisterPage