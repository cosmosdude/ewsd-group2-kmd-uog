import useEffectMostActiveGuestUsers from "../../hooks/useEffectMostActiveGuestUsers";

function MostActiveGuestListView() {
    let guests = useEffectMostActiveGuestUsers()

    return (
        <div className="grow basis-0 shrink-0 flex flex-col border">
            <h1 className="p-[10px] border-b text-md font-bold">
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