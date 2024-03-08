import Breadcrumb from "../components/Breadcrumb"

import SearchIcon from "../assets/search.png"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import AuthContext from "../contexts/AuthContext"
import ContributionCard from "../components/ContributionCard"
import useEffectUserDetail from "../hooks/useEffectUserDetail"
import useEffectMagazineDetail from "../hooks/useEffectMagazineDetail"

const MagazinePage = () => {

    // get route parameters
    let { magazineId } = useParams()
    let accessToken = useContext(AuthContext)
    // current closure value
    let [magazine] = useEffectMagazineDetail(magazineId)
    let [searchText, setSearchText] = useState('')

    let user = useEffectUserDetail()
    console.log("user detail is", user)

    return (
        <div className="flex flex-col h-full p-4 px-8 gap-8 overflow-y-hidden">
            <div className="flex gap-2 items-center">
                <Breadcrumb 
                    className="py-2"
                    links={[
                        {name: "home", link: "/home"},
                        {name: "contributions", link: '/contribution'},
                        {name: "history", link: '/magazine/history'},
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
                <div className="inline-flex items-center gap-2 p-1 border-2 mx-auto w-full md:w-auto rounded">
                    <img src={SearchIcon} className="inline-block w-[18px] h-[18px]"/>
                    <input 
                        className="outline-none grow md:grow-0 w-auto md:w-[300px] bg-transparent" 
                        type="text"
                        placeholder="Search by username, role or faculty"
                        value={searchText}
                        onChange={(e) => { 
                            setSearchText(e.target.value)
                        }}
                    />
                    {/* <div className="grow"/> */}
                </div>
            </div>
            <div className="grow flex overflow-y-scroll justify-center  overflow-x-scroll py-[10px]">
                {/* <div className="grid grid-cols-3 gap-3 w-full flex-wrap"> */}
                <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 items-start flex-wrap gap-[24px]">
                    <ContributionCard showComment commentCount={23}/>
                    <ContributionCard />
                    <ContributionCard />
                    <ContributionCard />
                </div>
            </div>
        </div>
    )
}

export default MagazinePage