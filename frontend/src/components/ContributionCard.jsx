import BorderedButton from "./BorderedButton"
import Carousel from "./Carousel"
import FilledButton from "./FilledButton"

import MessageIcon from "../assets/message.svg"
import { profile } from "../assets/profile/profile"
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
    authorId, author, 
    srcs = [],
    title, subtitle,
    description, facultyName,
    onView,
    allowsUpdate, onUpdate,
    status = undefined, commentCount = undefined,
    onCardClick
}) {
    console.log(srcs)
    let showBottom = status || commentCount

    return (
        // Outer
        <div 
            className={`
            text-left rounded border 
            transition-all 
            ${onCardClick ? 'cursor-pointer hover:border-secondary-500' : ''}
            `}
            onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                onCardClick?.()
                console.log()
            }}
        >
            <div className="flex flex-col w-[300px] p-[10px] gap-[10px]">
                <div className="flex gap-[5px] items-center py-[10px] border-b-[0.5px] border-b-secondary-200">
                    <img src={profile(authorId)} className="w-[30px] h-[30px] rounded-full"/>
                    <p className="grow text-xs font-bold">{author}</p>
                    <p className="shrink-0 text-xs font-bold">{facultyName}</p>
                </div>
                {/* Carousel container */}
                <Carousel images={srcs}/>
                {/* Name and Academic Year */}
                <div className="flex flex-col">
                    <p className="text-md font-bold">{title}</p>
                    {subtitle && <p className="text-sm">{subtitle}</p>}
                </div>
                {/* Description */}
                <div className="flex flex-col text-sm">
                    <p>{description}</p>
                </div>
                <div className="flex gap-[5px] max-h-[55px]">
                    <FilledButton className="grow shadow" title="Read Contribution" onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        onView?.()
                    }}/>
                    {allowsUpdate && <BorderedButton 
                        title='Update'
                        onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            onUpdate?.()
                        }}
                    />}
                </div>
                {showBottom ? <div className="mt-[10px] flex border-b-[0.5px] border-b-secondary-200"/> : false}
                {showBottom ? <div className="flex items-center">
                    {/* Status */}
                    {status && <p className="text-xs font-bold">{getStatusDisplay(status)}</p>}
                    {/* Spacer */}
                    <div className="grow"/> 
                    {/* Comment */}
                    {(commentCount === 0 || commentCount) ? <button 
                        className="
                        relative
                        flex items-center gap-[5px]
                        hover:opacity-50
                        transition-all
                        "
                        onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}
                    >
                        <img src={MessageIcon} className="w-[24px] h-[24px]"/>
                        <p className="absolute -top-[4px] -right-[4px] block text-m text-white bg-red-700 rounded-full min-w-[14px] min-h-[14px] px-[4px]">{commentCount}</p>
                    </button> : false}
                </div> : false}
            </div>
        </div>

    )
}