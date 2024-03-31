import { useEffect, useState } from "react";
import useEffectAllAcademicYears from "../../hooks/useEffectAllAcademicYears";
import useEffectFacultyGuestAndStudentCounts from "../../hooks/useEffectFacultyGuestAndStudentCounts";
import Dropdown from "../Dropdown";
import EWSDChart, { colors } from "../EWSDChart";
import useContributionsByFaculties from "../../hooks/useContributionsByFaculties";

function ContributionsByFacultyView() {
    // let counts = useEffectFacultyGuestAndStudentCounts()

    let colors = [
        "#F66D44",
        "#AADEA7",
        "#3392C5"
    ]

    let [academicYears] = useEffectAllAcademicYears()
    let [year, setYear] = useState()

    useEffect(() => {
        setYear(academicYears[0])
    }, [academicYears])

    let contributions = useContributionsByFaculties(year?.id ?? 0)
    console.log("Academic", year)
    console.log("Contributions", contributions, contributions.map(x => x.countribution_count))

    return ( 
        <>
        <div className="flex p-[10px]">
            <h1 className="p-[10px] text-md font-bold">
                Contributions by Faculty
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
        
        <div className="w-full p-[10px] grow flex flex-col ">
            <EWSDChart 
                type='doughnut' 
                data={{
                    labels: contributions.map(x => x.name),
                    datasets: [
                        {
                            label: 'Students',
                            data: contributions.map(x => x.countribution_count),
                            backgroundColor: colors,
                            borderColor: colors,
                            borderWidth: 1
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        // title: {
                        //     align: 'start'
                        // },
                        legend: {
                            display: true,
                            position: 'bottom'
                        },

                        datalabels: {
                            formatter: (value, ctx) => {
                                const datapoints = ctx.chart.data.datasets[0].data
                                const total = datapoints.reduce((total, datapoint) => total + datapoint, 0)
                                const percentage = value / total * 100
                                return percentage.toFixed(2) + "%";
                            },
                            color: '#fff',
                        }
                        
                    }
                }}
            />
        </div> 
        </>
    );
}

export default ContributionsByFacultyView;