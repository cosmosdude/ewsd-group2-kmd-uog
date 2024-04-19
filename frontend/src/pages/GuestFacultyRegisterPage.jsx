import { useNavigate } from "react-router";

import CrossSVG from "../assets/cross.svg"
import useEffectUnregisteredFaculties from "../hooks/useEffectUnregisteredFaculties";
import { useState } from "react";
import FilledButton from "../components/FilledButton";
import apiConfig from "../configs/api.config";
import { usePushNoti } from "../components/Noti/NotiSystem";
import { useAuthContext } from "../contexts/AuthContext";
import LoadingIndicator from "../components/LoadingIndicator";

function GuestFacultyRegisterPage() {

    let navigate = useNavigate()
    let pushNoti = usePushNoti()
    let auth = useAuthContext()

    let faculties = useEffectUnregisteredFaculties()

    let [loading, setLoading] = useState(false);

    let [selectedIds, setSelectedIds] = useState([])
    function toggle(id) {
        if (selectedIds.includes(id)) setSelectedIds(x => x.filter(x => x !== id))
        else setSelectedIds(x => [...x, id])
    }

    async function subscribe() {
        if (selectedIds.length === 0) return
        let f = new FormData()
        selectedIds.forEach((x, i) => {
            console.log(`faculties[${i}]`, x)
            f.set(`faculties[${i}]`, x)
        })

        setLoading(() => true)
        let response = await fetch(apiConfig.path.registerFacultiesForGuest(), {
            method: "POST",
            headers: {
                "authorization": `Bearer ${auth}`,
                "accept": "application/json"
            },
            body: f
        })

        let json = await response.json()
        if (response.status >= 200 && response.status < 300) {
            // capture the response payload
            // setFaculties(json.data)
            // allFaculties = json.data
            navigate("/contribution")
        } else {
            pushNoti({
                title: "Error",
                message: `Unable to subscribe to faculties. ${json.message} (status: ${response.status})`,
                style: 'danger'
            })
        }
        setLoading(() => false)
        console.log(json)
    }

    return (
        <div 
        className="
        fixed 
        left-0 top-0 
        z-[1000]
        flex w-screen h-screen bg-black/90 p-[25px] md:px-[150px] md:py-[50px] overflow-hidden
        "
    >
        <div className="my-auto w-full mx-[20px] md:mx-[100px] bg-white rounded-[14px] overflow-hidden">
            <div className="relative flex py-[24px] bg-secondary-200">
                <p className="m-auto text-lg font-bold">Subscribe Faculty</p>
                <button 
                    className="absolute right-[12px] top-[12px] my-auto hover:opacity-25 transition-all"
                    onClick={e => {
                        e.stopPropagation()
                        e.preventDefault()
                        navigate("/contribution")
                    }}
                >
                    <img src={CrossSVG} className="w-[24px] h-[24px]"/>
                </button>
            </div>
            <div className="flex flex-col py-[24px] px-[18px] md:px-[250px] gap-[25px]">
                <p className="mx-auto">
                    Subscribe your interested faculty to read the published contributions.
                </p>
                <div className="flex flex-wrap gap-[10px] align-center justify-center justify-items-center">
                    {faculties.map(x => {
                        return <Button 
                            key={x.id} 
                            name={x.name} 
                            selected={selectedIds.includes(x.id)}
                            onClick={() => toggle(x.id)}
                        />
                    })}
                </div>
                <div className="flex items-center justify-center">
                    {!loading && <FilledButton 
                        className="w-[250px] shadow-xl" title={"Subscribe"} onClick={subscribe}
                        gray={selectedIds.length === 0}
                    />}
                    {loading && <LoadingIndicator/>}
                </div>
                
            </div>
        </div>
    </div>
    );
}

export default GuestFacultyRegisterPage


function Button({name, selected, onClick}) {
    return (
        <div className="m-auto">
            <button 
                className={`
                inline-block 
                px-[16px] py-[8px]
                border border-secondary-500 
                ${selected ? "bg-secondary-700": "bg-white"}
                ${selected ? "text-primary-200": "text-dark-500"}
                rounded-full 
                hover:opacity-25
                transition-all
                `}

                onClick={onClick}
            >
                {name}
            </button>
        </div>
    )
}
