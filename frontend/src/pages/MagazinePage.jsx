import Breadcrumb from "../components/Breadcrumb"

import SearchIcon from "../assets/search.png"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import AuthContext from "../contexts/AuthContext"
import ContributionCard from "../components/ContributionCard"
import useEffectUserDetail from "../hooks/useEffectUserDetail"
import useEffectMagazineDetail from "../hooks/useEffectMagazineDetail"
import Dropdown from "../components/Dropdown"
import routesConfig from "../configs/routes.config"
import { Link } from "react-router-dom"
import useEffectSelectedArticlesOfMagazine from "../hooks/useEffectSelectedArticlesOfMagazine"
import apiConfig from "../configs/api.config"
import extractContributionImageSrcs from "../util/extractContributionImageSrcs"
import extractContributionFileSrc from "../util/extractContributionFileSrc"

const MagazinePage = () => {

    let navigate = useNavigate()

    // get route parameters
    let { magazineId } = useParams()
    // current closure value
    let [magazine] = useEffectMagazineDetail(magazineId)

    let user = useEffectUserDetail()
    let isStudent = 'student' === user.role_name
    console.log("user detail is", user)

    let articles = useEffectSelectedArticlesOfMagazine({magazineId, facultyId: "5"})

    return (
        <div className="flex flex-col h-full p-4 px-8 gap-[10px] overflow-y-hidden">
            <div className="flex gap-2 items-center">
                <Breadcrumb 
                    className="py-2"
                    links={[
                        {name: "home", link: "/home"},
                        {name: "magazines", link: '/contribution'},
                        {name: "previous", link: '/magazine/history'},
                        {name: magazine && magazine.name && magazine.name, current: true}
                    ]}
                />
                <span className="grow"/>
            </div>
            <div className="flex flex-col items-center gap-2">
                <h1 className="font-bold text-2xl">{magazine && magazine.name && magazine.name}</h1>
                <h1>Selected Contributions</h1>
            </div>
            <div className="flex flex-col">
                <div className="inline-flex items-center gap-[10px] mx-auto md:w-auto ">
                    <label>Filter:</label>
                    <Dropdown title="Select faculty"/>
                </div>
            </div>
            <div className="grow flex overflow-y-scroll justify-center  overflow-x-scroll py-[10px]">
                {/* <div className="grid grid-cols-3 gap-3 w-full flex-wrap"> */}
                <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 items-start flex-wrap gap-[24px]">
                {articles.map((item, index) => {
                        let status = item.contribution_status
                        let isUpload = status !== 'approve' && status !== 'reject'
                        return (
                            <ContributionCard 
                                key={index}
                                author={item.user_name}
                                srcs={
                                    extractContributionImageSrcs(item.images)
                                }
                                title={item.contribution_name} 
                                description={item.contribution_description}
                                onView={() => {
                                    // let filename = item.files?.split('public')[1]
                                    // if (filename) console.log(apiConfig.host + filename)
                                    // if (filename) window.open(apiConfig.host + filename, "_blank")
                                    window.open(
                                        extractContributionFileSrc(item.files),
                                        '_blank'
                                    )
                                }}
                                onCardClick={() => {
                                    navigate(routesConfig.contribution.detail(item.contribution_id))
                                }}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MagazinePage