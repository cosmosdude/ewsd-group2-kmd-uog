import useEffectFacultyGuestAndStudentCounts from "../../hooks/useEffectFacultyGuestAndStudentCounts";
import Dropdown from "../Dropdown";
import EWSDChart, { colors } from "../EWSDChart";

function NumberOfGuestsAndStudents() {
    let counts = useEffectFacultyGuestAndStudentCounts()

    let colors = [
        "#64C2A6",
        "#E6F69D"
    ]

    return ( 
        <>
        <div className="flex p-[10px]">
            <h1 className="p-[10px] text-md font-bold">
                Number of students and guests by faculty
            </h1>
            <div className="grow"/>
            {/* <Dropdown className="grow" title="Academic Year" modified/> */}
        </div>
        
        <div className="w-full h-[400px] p-[10px] flex flex-col">
            <EWSDChart 
                type='bar' 
                data={{
                    labels: counts.map(x => x.name),
                    datasets: [
                        {
                            label: 'Students',
                            data: counts.map(x => x.student_count),
                            backgroundColor: colors,
                            borderColor: colors,
                            borderWidth: 1
                        },
                        {
                            label: 'Guests',
                            data: counts.map(x => x.guest_count),
                            backgroundColor: colors,
                            borderColor: colors,
                            borderWidth: 1
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
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
                            display: true,
                            position: 'right'
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

export default NumberOfGuestsAndStudents;