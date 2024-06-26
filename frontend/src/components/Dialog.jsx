import FilledButton from "./FilledButton";

function Dialog({
    title, message, 
    style = "danger",
    confirmCTA, onConfirm, 
    dismissCTA, onDismiss
}) {
    let bg = 'bg-red-800'
    let text = 'text-white'
    if (style === 'normal') {
        bg = 'bg-secondary-200'
        text = 'text-black'
    }

    let hasCTA = !!confirmCTA || !!dismissCTA
    return (
        <div className={`fixed left-0 top-0 z-[20000] flex items-center justify-center w-screen h-screen bg-black/75`}>
            <div className="flex flex-col gap-[25px] items-center justify-center bg-white min-w-[350px] max-w-[300px] rounded-[6px] overflow-hidden">
                <div className={`${bg} w-full py-[15px]`}>
                    <h2 className={`w-full text-center ${text} text-md text-bold`}>{title}</h2>
                </div>
                <p className="px-[16px] text-sm">{message}</p>
                {hasCTA && <div className="flex gap-5 items-center justify-center pb-[25px]">
                    {/* <button className="p-2 px-4 rounded bg-purple-500 text-white" onClick={onConfirm}>{confirmCTA}</button> */}
                    {/* <button className="p-2 px-4 rounded bg-gray-400 text-white" onClick={onDismiss}>{dismissCTA}</button> */}
                    {dismissCTA && <FilledButton className="px-[25px]" style="gray" title={dismissCTA} onClick={onDismiss}/>}
                    {confirmCTA && <FilledButton className="px-[25px]" style="danger" title={confirmCTA} onClick={onConfirm}/>}
                </div>}
            </div>
        </div>
    )
}
export default Dialog;