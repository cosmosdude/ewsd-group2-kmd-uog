export default function ContributionCard() {
    return (
        <div className="w-[300px] min-h-[400px] rounded border">
            <div className="relative aspect-[5/3] bg-gray-100 w-full">
                <div className="absolute bottom-0 mx-auto flex gap-3">
                    <span className="w-[5px] h-[5px] bg-slate-500 left-[25px] rounded-full"></span>
                </div>
            </div>
        </div>
    )
}