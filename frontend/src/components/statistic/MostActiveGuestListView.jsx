import useEffectMostActiveGuestUsers from "../../hooks/useEffectMostActiveGuestUsers";

function MostActiveGuestListView() {
    let guests = useEffectMostActiveGuestUsers()

    return (
        <div className="grow basis-0 shrink-0 flex flex-col border rounded-[10px] overflow-scroll scrollbar-hidden">
            <h1 className="sticky top-0 left-0 bg-white z-[2] p-[10px] border-b text-md font-bold">
                Most Active Users
            </h1>
            <ul className="
            grow 
            flex flex-col
            py-[10px] [&>*]:px-[25px] 
            [&>*]:grow
            [&>*]:flex [&>*]:items-center
            [&>*]:text-sm
            ">
                {guests.map((s, i) => {
                    return <li key={i}>{i + 1}. {s.name}</li>
                })}
            </ul>
        </div>
    );
}

export default MostActiveGuestListView;