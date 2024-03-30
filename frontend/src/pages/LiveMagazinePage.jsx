import Breadcrumb from "../components/Breadcrumb"

import SearchIcon from "../assets/search.png"
import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { useAuthContext } from "../contexts/AuthContext"
import ContributionCard from "../components/ContributionCard"
import useEffectUserDetail from "../hooks/useEffectUserDetail"
import useEffectMagazineDetail from "../hooks/useEffectMagazineDetail"
import Dropdown from "../components/Dropdown"
import routesConfig from "../configs/routes.config"
import { Link } from "react-router-dom"
import useEffectArticlesOfCurrentMagazine from "../hooks/useEffectArticlesOfCurrentMagazine"
import apiConfig from "../configs/api.config"
import extractContributionImageSrcs from "../util/extractContributionImageSrcs"
import extractContributionFileSrc from "../util/extractContributionFileSrc"
import BorderedButton from "../components/BorderedButton"

const filter = {
    
    get statusOptions() {
        return [
            {id: 'all', name: "All"},
            {id: 'approve', name: "Approved"},
            {id: 'reject', name: "Rejected"},
        ]
    },

    get commentOptions() {
        return [
        // all/ non-commented/ commented/ overdue(for coordinatort)
            {id: 'all', name: "All"},
            {id: 'non-commented', name: "Non-Commented"},
            {id: 'commented', name: "Commented"},
            {id: 'overdue', name: "Overdue"},
        ]
    }
}

const LiveMagazinePage = () => {

    let navigate = useNavigate()
    let {pathname} = useLocation()
    // get route parameters
    let { magazineId } = useParams()
    console.log(pathname, magazineId)
    // current closure value
    let [magazine] = useEffectMagazineDetail(magazineId)

    let user = useEffectUserDetail()
    let isStudent = 'student' === user.role_name
    let isMC = 'm_coordinator' === user.role_name
    console.log("user detail is", user)

    let [statusFilter, setStatusFilter] = useState(filter.statusOptions[0])
    let [commentFilter, setCommentFilter] = useState(filter.commentOptions[0])

    let articles = useEffectArticlesOfCurrentMagazine({
        magazineId: magazineId,
        status: isStudent ? statusFilter.id : commentFilter.id
    })

    return (
        <div className="flex flex-col h-full p-4 px-8 gap-[10px] overflow-y-hidden">
            <div className="flex gap-2 items-center">
                <Breadcrumb 
                    className="py-2"
                    links={[
                        {name: "home", link: "/home"},
                        {name: "magazines", link: '/contribution'},
                        {name: "current", link: '/magazine/current'},
                        {name: magazine && magazine.name && magazine.name, current: true}
                    ]}
                />
                <span className="grow"/>
                { isStudent && <BorderedButton 
                    // className="p-2 pl-8 pr-8 text-purple-500 font-bold rounded"
                    title="New Contribution"
                    to={routesConfig.contribution.upload(magazineId)}
                />}
            </div>
            {/* <div className="flex flex-col items-center gap-2">
                <h1 className="font-bold text-2xl">{magazine && magazine.name && magazine.name}</h1>
                <h1>Selected Contributions</h1>
            </div> */}
            <div className="flex flex-col z-[1001]">
                <div className="inline-flex items-center gap-[10px] mx-auto md:w-auto ">
                    {isMC && <label>Filter:</label>}
                    {isMC && <Dropdown 
                        className="min-w-[200px]"
                        title={commentFilter.name} 
                        options={filter.commentOptions.map(x => x.name)}
                        onChange={(_, index) => {
                            setCommentFilter(filter.commentOptions[index])
                        }}
                    />}
                    {isStudent && <Dropdown 
                        className="min-w-[200px]"
                        title={statusFilter.name}
                        options={filter.statusOptions.map(x => x.name)}
                        onChange={(_, index) => {
                            setStatusFilter(filter.statusOptions[index])
                        }}
                    />}
                </div>
            </div>
            <div className="grow flex overflow-y-scroll justify-center  overflow-x-scroll py-[10px]">
                <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 items-start flex-wrap gap-[24px]">
                    {articles.map((item, index) => {
                        let status = item.contribution_status
                        let isUpload = status !== 'approve' && status !== 'reject'
                        return (
                            <ContributionCard 
                                key={index}
                                authorId={item.user_id}
                                author={item.user_name}
                                srcs={
                                    extractContributionImageSrcs(item?.images)
                                    // item.images.map(x => {
                                    //     return apiConfig.host + x.split('public')[1]
                                    // })
                                }
                                title={item.contribution_name} 
                                description={item.contribution_description}
                                status={item.contribution_status}
                                onView={() => {
                                    window.open(
                                        extractContributionFileSrc(item.files),
                                        '_blank'
                                    )
                                }}   
                                allowsUpdate={isStudent && isUpload}
                                onUpdate={() => {
                                    navigate(
                                        routesConfig.contribution.update(item.contribution_id)
                                    )
                                }}
                                commentCount={item.comment_count}
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

export default LiveMagazinePage