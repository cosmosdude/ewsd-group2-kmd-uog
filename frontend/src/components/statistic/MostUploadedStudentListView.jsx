import useEffectMostActiveStudents from "../../hooks/useEffectMostActiveStudents";

function MostUploadedStudentListView() {
    let students = useEffectMostActiveStudents()

    return (
        <div className="grow basis-0 shrink-0 flex flex-col border">
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
                {/* <li>1. Student</li>
                <li>2. Student 2</li>
                <li>3. Student 3</li> */}
                {students.map((s, i) => {
                    return <li key={i}>{i + 1}. {s.name}</li>
                })}
            </ul>
        </div>
    );
}

export default MostUploadedStudentListView;