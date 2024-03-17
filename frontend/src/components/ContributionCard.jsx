import BorderedButton from "./BorderedButton"
import Carousel from "./Carousel"
import FilledButton from "./FilledButton"
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
                    <div className="w-[30px] h-[30px] bg-slate-200 rounded-full"/>
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