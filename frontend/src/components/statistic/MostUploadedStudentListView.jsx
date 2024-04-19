import useEffectMostActiveStudents from "../../hooks/useEffectMostActiveStudents";

function MostUploadedStudentListView() {
    let students = useEffectMostActiveStudents()

    return (
        <div className="grow basis-0 shrink-0 flex flex-col border rounded-[10px] scrollbar-hidden">
            <h1 className="p-[10px] border-b text-md font-bold">
                Most Uploaded Students
            </h1>
            <ul className="
            grow 
            flex flex-col 
            py-[10px] [&>*]:px-[25px] 
            [&>*]:flex [&>*]:items-center
            [&>*]:grow
            [&>*]:text-sm
            ">
                {students.map((s, i) => {
                    return <li key={i}>{i + 1}. {s.name}</li>
                })}
            </ul>
        </div>
    );
}

export default MostUploadedStudentListView;