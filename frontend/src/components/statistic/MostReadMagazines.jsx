import useEffectMostReadMagazines from "../../hooks/useEffectMostReadMagazines";

function MostReadMagazines() {
    let magazines = useEffectMostReadMagazines()
    return (
        <div className="grow basis-0 shrink-0 flex flex-col border rounded-[10px] overflow-scroll scrollbar-hidden">
            <h1 className="sticky top-0 z-[1] p-[10px] border-b text-md font-bold bg-white">
                Popular Magazines
            </h1>
            <ul className="
            flex flex-col 
            py-[10px] [&>*]:px-[25px] 
            [&>*]:flex [&>*]:items-center
            [&>*]:text-sm
            ">
                {magazines.map((s, i) => {
                    return <li className="py-[10px]" key={i}>{i + 1}. {s.name}</li>
                })}
            </ul>
        </div>
    );
}

export default MostReadMagazines;