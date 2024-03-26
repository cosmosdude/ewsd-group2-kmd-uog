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
import MostReadMagazines from "../components/statistic/MostReadMagazines"
import MostReadContributions from "../components/statistic/MostReadContributions"
import GuestAndStudentCountView from "../components/statistic/GuestAndStudentCountView"
import NumberOfGuestsAndStudents from "../components/statistic/NumberOfGuestsAndStudents"
import ContributionsByFacultyView from "../components/statistic/ContributionsByFacultyView"
import CurrentContributionsView from "../components/statistic/CurrentContributionsView"

const DashboardPage = () => {
    return (
        <div className=" h-full flex flex-col gap-[10px] p-[20px] overflow-scroll bg-white">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-[10px]">
                <div className="border rounded-[10px] h-[400px] flex flex-col">
                    <CurrentContributionsView/>
                     
                </div>
                <div className="border rounded-[10px] flex flex-col h-[400px]">
                    <ContributionsByFacultyView/>
                    {/* <div className="flex p-[10px] items-start justify-start">
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
                    </div>   */}
                </div>
                {/* Popular Magazines */}
                <div className="h-[400px] flex flex-col gap-[10px]">
                    <MostReadMagazines/>
                    
                    {/*  Most Viewed Contributions */}
                    <MostReadContributions/>
                </div>
            {/* </div> */}

            {/* Bottom Row */}
            {/* <div className="w-full grid grid-cols-1 md:grid-cols-3 items-start gap-[10px]"> */}
                <div className="border rounded-[10px] h-[400px] flex flex-col">
                    <GuestAndStudentCountView/> 
                </div>

                {/* Most Active Users */}
                <div className="h-[400px] flex flex-col gap-[10px]">
                    <MostUploadedStudentListView/>
                    {/*  Most Active Guests */}
                    <MostActiveGuestListView/>
                </div>
                <div className="h-[400px] flex flex-col gap-[10px] border rounded-[10px] overflow-scroll">
                    <MostUsedBrowserListView/>
                </div>
            </div>
            <div className="border rounded-[10px] flex flex-col">
                <NumberOfGuestsAndStudents/> 
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


