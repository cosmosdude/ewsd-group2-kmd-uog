import {Link, useNavigate} from "react-router-dom"

import "../style/tailwind.css"
import { useEffect, useRef, useState } from "react"
import SideNav from "../components/SideNav"
import SideNavItem from "../components/SideNavItem"
import EWSDChart, {colors} from "../components/EWSDChart"
import Dropdown from "../components/Dropdown"
import MostUploadedStudentListView from "../components/statistic/MostUploadedStudentListView"
import MostActiveGuestListView from "../components/statistic/MostActiveGuestListView"
import MostUsedBrowserListView from "../components/statistic/MostUsedBrowserListView"

const DashboardPage = () => {
    return (
        <div className=" h-full flex flex-col gap-[10px] p-[20px] overflow-scroll bg-white">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-[10px]">
                <div className="border h-[400px] flex flex-col">
                    <div className="flex p-[10px] items-center justify-start">
                        <h1 className="px-[10px] text-md font-bold">
                            Contributions
                        </h1>
                        <div className="grow"/>
                        <Dropdown className="grow" title="Magazine Name" modified/>
                    </div>
                    <div className="w-full p-[10px] grow flex flex-col">
                        <EWSDChart 
                            type='bar' 
                            data={{
                                labels: ["Commented", "Unommented", "Overdue"],
                                datasets: [{
                                label: 'My First Dataset',
                                data: [65, 59, 40],
                                backgroundColor: colors.background,
                                borderColor: colors.border,
                                borderWidth: 1
                                }]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display:false
                                    }
                                }
                            }}
                        />
                    </div>  
                </div>
                <div className="border flex flex-col h-[400px]">
                    <div className="flex p-[10px] items-start justify-start">
                        <h1 className="text-md font-bold">
                        Contributions{<br/>}By Faculty
                        </h1>
                        <div className="grow"/>
                        <Dropdown className="grow" title="Academic Year" modified/>
                    </div>
                    
                    <div className="w-full p-[10px] grow flex flex-col ">
                        <EWSDChart 
                            type='doughnut' 
                            data={{
                                labels: ["Business", "Arts", "IT"],
                                datasets: [
                                    {
                                        label: 'Students',
                                        data: [65, 59, 40],
                                        backgroundColor: colors.background,
                                        borderColor: colors.border,
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
                                    
                                }
                            }}
                        />
                    </div>  
                </div>
                {/* Popular Magazines */}
                <div className="h-[400px] flex flex-col gap-[10px]">
                    <div className="grow basis-0 shrink-0 flex flex-col border">
                        <h1 className="p-[10px] border-b text-md font-bold">
                            Popular Magazines
                        </h1>
                        <ul className="
                        grow 
                        flex flex-col 
                        py-[10px] [&>*]:px-[25px] 
                        [&>*]:flex [&>*]:items-center
                        [&>*]:grow
                        [&>*]:text-sm
                        ">
                            <li>1. Mother's Day</li>
                            <li>2. World Education</li>
                            <li>3. International Fair</li>
                        </ul>
                    </div>
                    {/*  Most Viewed Contributions */}
                    <div className="grow basis-0 shrink-0 flex flex-col border">
                        <h1 className="p-[10px] border-b text-md font-bold">
                            Most Viewed Contributions
                        </h1>
                        <ul className="
                        grow 
                        flex flex-col
                        py-[10px] [&>*]:px-[25px] 
                        [&>*]:grow
                        [&>*]:flex [&>*]:items-center
                        [&>*]:text-sm
                        ">
                            <li>1. Mother's Day</li>
                            <li>2. World Education</li>
                            <li>3. International Fair</li>
                        </ul>
                    </div>
                </div>
            {/* </div> */}

            {/* Bottom Row */}
            {/* <div className="w-full grid grid-cols-1 md:grid-cols-3 items-start gap-[10px]"> */}
                <div className="border h-[400px] flex flex-col">
                    <div className="flex p-[10px]">
                        <h1 className="p-[10px] text-md font-bold">
                            List of Faculty
                        </h1>
                        <div className="grow"/>
                        <Dropdown className="grow" title="Academic Year" modified/>
                    </div>
                    
                    <div className="w-full p-[10px] grow flex flex-col">
                        <EWSDChart 
                            type='bar' 
                            data={{
                                labels: ["Business", "Arts", "IT"],
                                datasets: [
                                    {
                                        label: 'Students',
                                        data: [65, 59, 40],
                                        backgroundColor: colors.background,
                                        borderColor: colors.border,
                                        borderWidth: 1
                                    },
                                    {
                                        label: 'Guests',
                                        data: [50, 40, 30],
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
                </div>

                {/* Most Active Users */}
                <div className="h-[400px] flex flex-col gap-[10px]">
                    <MostUploadedStudentListView/>
                    {/*  Most Active Guests */}
                    <MostActiveGuestListView/>
                </div>
                <div className="h-[400px] flex flex-col gap-[10px] border overflow-scroll">
                    <MostUsedBrowserListView/>
                </div>
            </div>
        </div>
    )
}

// {
//     labels: ["a", "b", "c", "d", 'e', 'f', 'g'],
//     datasets: [{
//       label: 'My First Dataset',
//       data: [65, 59, 80, 81, 56, 55, 40],
//       backgroundColor: colors.background,
//       borderColor: colors.border,
//       borderWidth: 1
//     }]
// }

export default DashboardPage


