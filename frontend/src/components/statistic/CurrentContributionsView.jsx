import { useEffect, useState } from "react";
import useEffectAllAcademicYears from "../../hooks/useEffectAllAcademicYears";
import useEffectFacultyGuestAndStudentCounts from "../../hooks/useEffectFacultyGuestAndStudentCounts";
import Dropdown from "../Dropdown";
import EWSDChart, { colors } from "../EWSDChart";
import useEffectMagazines from "../../hooks/useEffectMagazines";
import useMagazineCommentStatues from "../../hooks/useMagazineCommentStatues";

function CurrentContributionsView() {

    let magazines = useEffectMagazines()
    let [magazine, setMagazine] = useState()

    useEffect(() => {
        setMagazine(magazines[0])
    }, [magazines])

    let count = useMagazineCommentStatues(magazine?.id)

    return ( 
        <>
        <div className="flex p-[10px] items-center justify-start">
            <h1 className="px-[10px] text-md font-bold">
                Contributions
            </h1>
            <div className="grow"/>
            <Dropdown 
                className="grow" 
                title={magazine?.name ?? "Magazine Name" }
                index={magazines.findIndex((x) => { return x.id === magazine?.id})}
                options={magazines.map(x => x.name)}
                onChange={(item, i) => {
                    setMagazine(magazines[i])
                }}
                modified
            />
        </div>
        <div className="w-full p-[10px] grow flex flex-col">
            <EWSDChart 
                type='bar' 
                data={{
                    labels: ["Commented", "Unommented", "Overdue"],
                    datasets: [{
                    label: 'Contributions',
                    data: [count.commented, count.uncommented, count.overdue],
                    backgroundColor: "#66ADD3",
                    borderColor: "#66ADD3",
                    borderWidth: 1
                    }]
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display:false
                        },
                        datalabels: { display:false }
                    }
                }}
            />
        </div>  
        </>
    );
}

export default CurrentContributionsView;