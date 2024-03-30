import Breadcrumb from "../components/Breadcrumb"

import SearchIcon from "../assets/search.png"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useAuthContext } from "../contexts/AuthContext"
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
import useEffectAllFaculties from "../hooks/useEffectAllFaculties"
import { usePushNoti } from "../components/Noti/NotiSystem"

const MagazinePage = () => {
    let pushNoti = usePushNoti()
    let navigate = useNavigate()

    // get route parameters
    let { magazineId } = useParams()
    // current closure value
    let [magazine] = useEffectMagazineDetail(magazineId)

    let [faculties] = useEffectAllFaculties()
    let [faculty, setFaculty] = useState({name: "All", id: null})

    let user = useEffectUserDetail()
    let isMM = 'm_manager' === user.role_name
    console.log("user detail is", user)

    let articles = useEffectSelectedArticlesOfMagazine({
        magazineId, facultyId: faculty.id
    })

    let accessToken = useAuthContext()

    let token = useAuthContext()

    async function markAsRead(id) {
        try {
            let response = await fetch(apiConfig.path.readArticle(id), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Accept": "application/json"
                }
            })

            let json = await response.json()
            console.log(json.data)
            if (response.status === 200) {
                // json.data.comments = [10, 20]
                setData(json.data)
            } else {
                pushNoti({
                    title: "Unable to mark as read", 
                    message: json.message,
                    style: 'danger'
                })
            }
            
        } catch (e) {
            console.error("Error", e)
            console.log("Error while fetching user data")
        }
    }

    async function downloadAllArticles() {
        try {
            let res = await fetch(
                apiConfig.path.magazineDownload(magazineId), {
                    method: "POST",
                    headers: {
                        'accepts': 'application/json',
                        'authorization': `Bearer ${accessToken}`
                    }
                }
            )

            if (res.status == 200) {
                let json = await res.json()
                window.open(json.download_link, '_block')
            } else {
                console.log("Unable to download all articles")
            }
        } catch (error) { console.log(error) }
    }

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
                { isMM && <button 
                    className="p-2 pl-8 pr-8 text-purple-500 font-bold rounded"
                    onClick={downloadAllArticles}
                    // to={
                    //     // routesConfig.contribution.upload(magazineId)
                    // }
                >
                    Download Magazine
                </button>}
            </div>
            <div className="flex flex-col items-center gap-2">
                <h1 className="font-bold text-2xl">{magazine && magazine.name && magazine.name}</h1>
                <h1>Selected Contributions</h1>
            </div>
            <div className="flex flex-col z-[1001]">
                <div className="inline-flex items-center gap-[10px] mx-auto md:w-auto ">
                    <label>Filter:</label>
                    <Dropdown 
                        className="min-w-[200px]" 
                        title={faculty?.name ?? "Select faculty"} 
                        index={
                            faculties.indexOf(faculty) + 1
                        }
                        options={
                            ['All', ...faculties.map(x => x.name)]
                        }
                        onChange={(name, index) => {
                            if (index === 0) setFaculty({name: "All", id:null})
                            else setFaculty(faculties[index - 1])
                        }}
                    />
                </div>
            </div>
            <div className="grow flex overflow-y-scroll justify-center  overflow-x-scroll py-[10px]">
                {/* <div className="grid grid-cols-3 gap-3 w-full flex-wrap"> */}
                <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 items-start flex-wrap gap-[24px]">
                {articles.map((item, index) => {
                        let status = item.contribution_status
                        return (
                            <ContributionCard 
                                key={index}
                                authorId={item.user_id}
                                author={item.user_name}
                                facultyName={item.faculty_name}
                                srcs={
                                    extractContributionImageSrcs(item.images)
                                }
                                title={item.contribution_name} 
                                description={item.contribution_description}
                                onView={() => {
                                    window.open(
                                        extractContributionFileSrc(item.files),
                                        '_blank'
                                    )
                                    markAsRead(item.id)
                                }}
                                // onCardClick={() => {
                                //     navigate(routesConfig.contribution.detail(item.contribution_id))
                                // }}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MagazinePage