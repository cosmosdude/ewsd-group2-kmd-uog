function Dialog({title, message, confirmCTA, onConfirm, dismissCTA, onDismiss}) {
    return (
        <div className={`fixed flex items-center justify-center w-screen h-screen bg-[rgba(0,0,0,0.25)]`}>
            <div className="flex flex-col gap-3 items-center justify-center bg-white p-4 min-w-[300px] max-w-[300px] rounded">
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="flex gap-5 items-center justify-center">
                    <button className="p-2 px-4 rounded bg-purple-500 text-white" onClick={onConfirm}>{confirmCTA}</button>
                    <button className="p-2 px-4 rounded bg-gray-400 text-white" onClick={onDismiss}>{dismissCTA}</button>
                </div>
            </div>
        </div>
    )
}
export default Dialog;