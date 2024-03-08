import Carousel from "./Carousel"
// import { Carousel } from 'react-responsive-carousel'

export default function ContributionCard() {
    return (
        // Outer
        <button 
            className="text-left rounded border hover:border-purple-500 transition-all"
            onClick={e => {
                e.preventDefault()
            }}
        >
        <div className="flex flex-col w-[300px] p-[10px] gap-[10px]">
            <div className="flex gap-[5px] items-center py-[10px] border-b border-b-slate-200">
                <div className="w-[30px] h-[30px] bg-slate-200 rounded-full"/>
                <p className="grow">Name</p>
                <p className="shrink-0">IT Faculty</p>
            </div>
            {/* Carousel container */}
            <Carousel images={[
                'https://picsum.photos/id/237/500',
                'https://picsum.photos/id/238/500',
                'https://picsum.photos/id/239/500',
            ]}/>
            {/* Name and Academic Year */}
            <div className="flex flex-col">
                <p>Name</p>
                <p>2021-2022 Academic year</p>
            </div>
            {/* Description */}
            <div className="flex flex-col">
                <p>
                    Lorem ipsum dolar armat. Lorem ipsum dolar armat. Lorem ipsum dolar armat. Lorem ipsum dolar armat
                </p>
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
                    }}
                >
                    Read Contribution
                </button>
                <button 
                    className="
                    bg-white border border-indigo-600 rounded px-[10px] py-[5px] text-indog-600
                    hover:opacity-50
                    transition-all
                    "
                    onClick={e => {
                        e.preventDefault()
                    }}
                >
                    Update
                </button>
            </div>
            <div className="flex border-b border-b-bg-slate-500"/>
            <div className="flex">
                <div className="grow"/>

                <button 
                    className="
                    flex items-center gap-[5px]
                    hover:opacity-50
                    transition-all
                    "
                    onClick={e => {
                        e.preventDefault()
                    }}
                >
                    <img className="w-[24px] h-[24px]"/>
                    2
                </button>
            </div>
        </div>
        </button>
    )
}