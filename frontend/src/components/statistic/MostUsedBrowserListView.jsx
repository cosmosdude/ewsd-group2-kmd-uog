import useEffectMostUsedBrowsers from "../../hooks/useEffectMostUsedBrowsers";

function MostUsedBrowserListView() {
    let browsers = useEffectMostUsedBrowsers()
    return (
        <div className="grow basis-0 shrink-0 flex flex-col scrollbar-hidden">
            <h1 className="sticky top-0 p-[10px] bg-white border-b text-md font-bold">
                Most Used Web Browsers
            </h1>
            <ul className="
            grow 
            flex flex-col 
            py-[10px] [&>*]:px-[25px] [&>*]:py-[12px] 
            [&>*]:flex [&>*]:items-center
            [&>*]:text-sm
            ">
                {browsers.map((s, i) => {
                    return <li key={i}>{i + 1}. {s.name}</li>
                })}
                {/* <li>1. Chrome</li>
                <li>2. Safari</li>
                <li>3. Microsoft Edge</li>
                <li>4. Firefox</li>
                <li>5. Opera</li>
                <li>5. Opera</li>
                <li>5. Opera</li>
                <li>5. Opera</li>
                <li>5. Opera</li>
                <li>5. Opera</li>
                <li>5. Opera</li> */}
            </ul>
        </div>
    );
}

export default MostUsedBrowserListView;