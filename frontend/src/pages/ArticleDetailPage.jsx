import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ContributionCard from "../components/ContributionCard";
import useEffectArticleDetail from "../hooks/useEffectArticleDetail";
import apiConfig from "../configs/api.config";
import useEffectUserDetail from "../hooks/useEffectUserDetail";

function ArticleDetailPage() {
    let {id} = useParams()

    let user = useEffectUserDetail()
    let isStudent = user.role_name === 'student'

    let detail = useEffectArticleDetail(id)
    console.log(detail)
    return (
        // Full container
        // if not on small device, it will be 2 panels.
        // will become vertical mode on mobile view.
        <div className="flex flex-col md:flex-row w-full h-full overflow-scroll">
            <div className="
                grow flex flex-col gap-8 w-full h-auto md:h-full p-4 px-8
            ">
                {/* Title section */}
                <div className="flex gap-2 items-center">
                    <Breadcrumb 
                        className="py-2"
                        links={[
                            {name: "home", link: "/home"},
                            {name: "back", link: -1},
                            {name: "comment", current: true},
                        ]}/>
                    <span className="grow"/>
                </div>
                {/* Detail section */}
                <div className="flex flex-col gap-[20px] items-center md:overflow-y-scroll">
                    <h1 className="text-2xl font-bold">Comment Section</h1>
                    <div className="flex flex-col gap-[20px]">
                        <ContributionCard
                            author={detail.contribution?.user_name}
                            srcs={
                                [apiConfig.host + "/images/" + detail.contribution?.images]
                                // detail.contribution?.images?.map(x => {
                                //     return apiConfig.host + x.split('public')[1]
                                //     // console.log()
                                //     // return x
                                // }) ?? []
                            }
                            title={detail.contribution?.name} 
                            subtitle={"gg"}
                            description={detail.contribution?.description}
                        />
                        {!isStudent && <div className="mx-[20px] grid grid-cols-2 gap-[10px]">
                            <button 
                                className="
                                rounded bg-blue-400 text-white py-[5px]
                                hover:opacity-50
                                transition-all
                                "
                            >Approve</button>
                            <button 
                                className="
                                rounded bg-red-500 text-white py-[5px]
                                hover:opacity-50
                                transition-all
                                "
                            >Reject</button>
                        </div>}
                    </div>
                </div>
            </div>
            <div className="
            flex flex-col gap-[20px]
            md:w-[400px] md:overflow-y-scroll
            p-[20px]
            bg-slate-200 
            ">
                {detail?.comments?.map((x, i) => {
                    return <Comment key={i}/>
                }) ?? false}

                <CommentBox/>
            </div>
        </div>
    );
}

export default ArticleDetailPage;

function Comment({title, ago, comment}) {
    return (
        <div className="flex flex-col gap-[10px] bg-white p-[20px]">
            <div className="flex gap-[10px] items-center pb-[10px] border-b">
                <div className="w-[40px] aspect-square border rounded-full"/>
                <div className="flex flex-col grow">
                    <p>{title === undefined ? "Dr. Hla": title}</p>
                    <p className="text-sm">{ago === undefined ? "5 hours ago" : ago}</p>
                </div>
            </div>
            <p>
            {comment !== undefined ? comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales, augue commodo rhoncus dapibus, est risus auctor tellus, eu lobortis metus est nec lacus."}
            </p>
        </div>
    );
}

function CommentBox() {
    return (
        <div className="flex gap-[10px] items-start bg-white p-[20px]">
            <div className="block w-[40px] aspect-square border rounded-full"/>
            <div className="grow flex flex-col items-end gap-[10px]">
                <textarea className="p-[5px] w-full h-[75px] resize-none border"/>
                <button 
                    className="
                    flex w-[30px] aspect-square 
                    border-[2px] border-slate-200 rounded-full
                    bg-slate-50 hover:bg-slate-200
                    "
                />
            </div>
        </div>
    )
}