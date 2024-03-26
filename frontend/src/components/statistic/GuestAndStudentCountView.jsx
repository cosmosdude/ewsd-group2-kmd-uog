import useEffectFacultyGuestAndStudentCounts from "../../hooks/useEffectFacultyGuestAndStudentCounts";
import Dropdown from "../Dropdown";
import EWSDChart, { colors } from "../EWSDChart";

function GuestAndStudentCountView() {
    let counts = useEffectFacultyGuestAndStudentCounts()

    return ( 
        <>
        <div className="flex p-[10px]">
            <h1 className="p-[10px] text-md font-bold">
                List of Faculty
            </h1>
            <div className="grow"/>
            {/* <Dropdown className="grow" title="Academic Year" modified/> */}
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
                            backgroundColor: colors.background,
                            borderColor: colors.border,
                            borderWidth: 1
                        },
                        {
                            label: 'Guests',
                            data: counts.map(x => x.guest_count),
                            backgroundColor: colors.background,
                            borderColor: colors.border,
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
                        
                    }
                }}
            />
        </div> 
        </>
    );
}

export default GuestAndStudentCountView;