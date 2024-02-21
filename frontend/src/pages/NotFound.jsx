import "../style/tailwind.css"

export default () => {
    return (
        <div className="flex flex-col h-screen items-center justify-center place-content-center">
            <div className="flex flex-col">
                <h1 className="inline-block text-9xl font-extralight">404</h1>
                <h1 className="inline-block text-3xl font-extralight">Not Found</h1>
            </div>
        </div>
    )
}