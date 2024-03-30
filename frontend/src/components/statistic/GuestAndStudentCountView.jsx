import { useState } from "react";
import useEffectAllAcademicYears from "../../hooks/useEffectAllAcademicYears";
import useEffectFacultyGuestAndStudentCounts from "../../hooks/useEffectFacultyGuestAndStudentCounts";
import Dropdown from "../Dropdown";
import EWSDChart, { colors } from "../EWSDChart";

function GuestAndStudentCountView() {
    let counts = useEffectFacultyGuestAndStudentCounts()

    let colors = [
        "#94B777",
        "#E6F69D"
    ]

    let [academicYears] = useEffectAllAcademicYears()
    let [year, setYear] = useState()

    return ( 
        <>
        <div className="flex p-[10px]">
            <h1 className="p-[10px] text-md font-bold">
                List of Faculty
            </h1>
            <div className="grow"/>
            <Dropdown 
                className="grow" 
                title={year?.name ?? "Academic Year" }
                index={academicYears.findIndex((x) => { return x.id === year?.id})}
                options={academicYears.map(x => x.name)}
                onChange={(item, i) => {
                    setYear(academicYears[i])
                }}
                modified
            />
        </div>
        
        <div className="w-full p-[10px] grow flex flex-col">
            <EWSDChart 
                type='bar' 
                data={{
                    labels: counts.map(x => x.name),
                    datasets: [
                        {
                            label: 'Students',
                            data: counts.map(x => x.student_count),
                            backgroundColor: colors[0],
                            borderColor: colors[0],
                            borderWidth: 1
                        },
                        {
                            label: 'Guests',
                            data: counts.map(x => x.guest_count),
                            backgroundColor: colors[1],
                            borderColor: colors[1],
                            borderWidth: 1
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            ticks: {
                                minRotation: 0,
                                maxRotation: 0,
                                skips: false
                            }
                        }
                    },
                    plugins: {
                        title: {
                            align: 'start'
                        },
                        legend: {
                            display:false
                        },
                        datalabels: {
                            display: false
                        }
                    }
                }}
            />
        </div> 
        </>
    );
}

export default GuestAndStudentCountView;