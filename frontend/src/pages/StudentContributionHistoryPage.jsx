import Breadcrumb from "../components/Breadcrumb"

import SearchIcon from "../assets/search.png"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import AuthContext from "../contexts/AuthContext"
import ContributionCard from "../components/ContributionCard"
import useEffectUserDetail from "../hooks/useEffectUserDetail"
import useEffectMagazineDetail from "../hooks/useEffectMagazineDetail"
import Dropdown from "../components/Dropdown"

const StudentContributionHistoryPage = () => {
    return (
        <div className="flex flex-col h-full p-4 px-8 gap-[10px] overflow-y-hidden">
            <div className="flex gap-2 items-center">
                <Breadcrumb 
                    className="py-2"
                    links={[
                        {name: "home", link: "/home"},
                        {name: "magazines", link: '/contribution'},
                        {name: "current", link: '/magazine/current'},
                        {name: "submission history", current: true}
                    ]}
                />
                <span className="grow"/>
            </div>
            <div className="flex flex-col items-center gap-2">
                <h1 className="font-bold text-2xl">History</h1>
            </div>
            {/* <div className="flex flex-col">
                <div className="inline-flex items-center gap-[10px] mx-auto md:w-auto ">
                    <label>Filter:</label>
                    <Dropdown title="Select faculty"/>
                </div>
            </div> */}
            <div className="grow flex overflow-y-scroll justify-center  overflow-x-scroll py-[10px]">
                {/* <div className="grid grid-cols-3 gap-3 w-full flex-wrap"> */}
                <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 items-start flex-wrap gap-[24px]">
                    <ContributionCard />
                    <ContributionCard />
                    <ContributionCard />
                    <ContributionCard />
                </div>
            </div>
        </div>
    )
}

export default StudentContributionHistoryPage