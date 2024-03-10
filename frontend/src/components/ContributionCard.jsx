import Carousel from "./Carousel"
// import { Carousel } from 'react-responsive-carousel'

function getStatusDisplay(status) {
    switch (status) {
    case 'approve': return "Approved"
    case 'reject': return "Rejected"
    case 'upload': return "Pending"
    default:
        return undefined    
    }
    
}

export default function ContributionCard({
    author, 
    srcs = [],
    title, subtitle,
    description, facultyName,
    showUpdate,
    status = undefined, commentCount = undefined,
    onCardClick
}) {
    console.log("image srcs", srcs)
    console.log("status is", status)
    console.log("comment count", commentCount)

    let showBottom = status || commentCount

    return (
        // Outer
        <div 
            className="text-left rounded border hover:border-purple-500 transition-all cursor-pointer"
            onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                onCardClick()
            }}
        >
            <div className="flex flex-col w-[300px] p-[10px] gap-[10px]">
                <div className="flex gap-[5px] items-center py-[10px] border-b border-b-slate-200">
                    <div className="w-[30px] h-[30px] bg-slate-200 rounded-full"/>
                    <p className="grow">{author}</p>
                    <p className="shrink-0">{facultyName}</p>
                </div>
                {/* Carousel container */}
                <Carousel images={srcs}/>
                {/* Name and Academic Year */}
                <div className="flex flex-col">
                    <p className="font-bold">{title}</p>
                    {subtitle && <p>{subtitle}</p>}
                </div>
                {/* Description */}
                <div className="flex flex-col">
                    <p>{description}</p>
                </div>
                <div className="flex gap-[5px]">
                    <button 
                        className="
                        grow bg-indigo-600 rounded px-[10px] py-[5px] text-white
                        hover:opacity-50
                        transition-all
                        "
                        onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}
                    >
                        Read Contribution
                    </button>
                    {showUpdate && <button 
                        className="
                        bg-white border border-indigo-600 rounded px-[10px] py-[5px] text-indog-600
                        hover:opacity-50
                        transition-all
                        "
                        onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}
                    >
                        Update
                    </button>}
                </div>
                {showBottom ? <div className="flex border-b border-b-bg-slate-500"/> : false}
                {showBottom ? <div className="flex">
                    {/* Status */}
                    {status && <p>{getStatusDisplay(status)}</p>}
                    {/* Spacer */}
                    <div className="grow"/> 
                    {/* Comment */}
                    {(commentCount === 0 || commentCount) ? <button 
                        className="
                        flex items-center gap-[5px]
                        hover:opacity-50
                        transition-all
                        "
                        onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}
                    >
                        <img className="w-[24px] h-[24px]"/>
                        {commentCount}
                    </button> : false}
                </div> : false}
            </div>
        </div>

    )
}