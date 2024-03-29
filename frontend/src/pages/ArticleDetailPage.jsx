import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ContributionCard from "../components/ContributionCard";
import useEffectArticleDetail from "../hooks/useEffectArticleDetail";
import apiConfig from "../configs/api.config";
import useEffectUserDetail from "../hooks/useEffectUserDetail";
import { useContext, useRef, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import extractContributionFileSrc from "../util/extractContributionFileSrc";
import routesConfig from "../configs/routes.config";
import extractContributionImageSrcs from "../util/extractContributionImageSrcs";

function ArticleDetailPage() {

    let navigate = useNavigate()
    let {id} = useParams()
    let accessToken = useContext(AuthContext)

    let user = useEffectUserDetail()
    let isStudent = user.role_name === 'student'

    let [commentUUID, setCommentUUID] = useState(Math.random())

    let detail = useEffectArticleDetail(id, [commentUUID])
    let status = detail?.contribution?.status
    let isUpload = status !== 'approve' && status !== 'reject'
    console.log(detail, isUpload)

    async function updateStatus(status) {
        let data = `closure_id=${detail?.contribution?.closure_id}&status=${status}`
        try {
            let response = await fetch('http://127.0.0.1:8000/api/contributions/status/'+id, {
                method: 'PUT',
                headers: {
                    'authorization': `Bearer ${accessToken}`,
                    'accept': 'application/json',
                    'content-type': 'application/x-www-form-urlencoded'
                }, body: data
            })
            console.log('FUCK', response.status)
            // console.log(await response.text())
            let json = await response.json()
            console.log('FUCK json', json)
            if (response.status === 200) {
                let results = json?.data 
                console.log("FUCK", results)
            } else {
                console.log('FUCK json', json)
            }

            setCommentUUID(Math.random())
        } catch (e) { 
            console.log("FUCK Error", e)
        }
    }

    async function comment(text) {
        if (!text) return

        try {
            let f = new FormData()
            f.append('contribution_id', id)
            f.append('content', text)
            
            let res = await fetch('http://127.0.0.1:8000/api/comments', {
                method: "POST",
                headers: {
                    'accepts': 'application/json',
                    'authorization': `Bearer ${accessToken}`
                },
                body: f
            })
            setCommentUUID(Math.random())

        } catch (error) {
            console.log(error)
        }
    }

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
                                extractContributionImageSrcs(detail.contribution?.images)
                                // [apiConfig.host + "/images/" + detail.contribution?.images]
                            }
                            title={detail.contribution?.name} 
                            description={detail.contribution?.description}
                            allowsUpdate={isStudent && isUpload}
                            onUpdate={() => {
                                navigate(
                                    routesConfig.contribution.update(detail.contribution.id)
                                )
                            }}
                            onView={() => {
                                window.open(
                                    extractContributionFileSrc(detail.contribution.files),
                                    '_blank'
                                )
                            }} 
                            status={detail.contribution?.status}
                            commentCount={detail.comments?.length}
                        />
                        {(isUpload && !isStudent) && <div className="mx-[20px] grid grid-cols-2 gap-[10px]">
                            <button 
                                className="
                                rounded bg-blue-400 text-white py-[5px]
                                hover:opacity-50
                                transition-all
                                "
                                onClick={() => updateStatus('approve')}
                            >Approve</button>
                            <button 
                                className="
                                rounded bg-red-500 text-white py-[5px]
                                hover:opacity-50
                                transition-all
                                "
                                onClick={() => updateStatus('reject')}
                            >Reject</button>
                        </div>}
                    </div>
                </div>
            </div>
            <div className="
            flex flex-col gap-[20px]
            md:w-[550px] md:overflow-y-scroll
            p-[20px]
            bg-slate-200 
            ">
                {detail?.comments?.map((x, i) => {
                    return <Comment 
                        key={i}
                        author={x.commenter}
                        ago={x.commented_time}
                        comment={x.comment_content}
                    />
                }) ?? false}

                <CommentBox onComment={comment}/>
            </div>
        </div>
    );
}

export default ArticleDetailPage;

function Comment({author, ago, comment}) {
    return (
        <div className="flex flex-col gap-[10px] bg-white p-[20px]">
            <div className="flex gap-[10px] items-center pb-[10px] border-b">
                <div className="w-[40px] aspect-square border rounded-full"/>
                <div className="flex flex-col grow">
                    <p className="font-bold">{author === undefined ? "Dr. Hla": author}</p>
                    <p className="text-sm font-light">{ago === undefined ? "5 hours ago" : ago}</p>
                </div>
            </div>
            <p>
            {comment !== undefined ? comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales, augue commodo rhoncus dapibus, est risus auctor tellus, eu lobortis metus est nec lacus."}
            </p>
        </div>
    );
}

function CommentBox({onComment}) {
    let textArea = useRef()
    return (
        <div className="flex gap-[10px] items-start bg-white p-[20px]">
            <div className="block w-[40px] aspect-square border rounded-full"/>
            <div className="grow flex flex-col items-end gap-[10px]">
                <textarea ref={textArea} className="p-[5px] w-full h-[75px] resize-none border"/>
                <button 
                    className="
                    flex w-[30px] aspect-square 
                    border-[2px] border-slate-200 rounded-full
                    bg-slate-50 hover:bg-slate-200
                    "
                    onClick={e => {
                        e.preventDefault()
                        console.log(textArea)
                        console.log(textArea.current.value)
                        onComment?.(textArea.current.value)
                        textArea.current.value = ""
                    }}
                />
            </div>
        </div>
    )
}