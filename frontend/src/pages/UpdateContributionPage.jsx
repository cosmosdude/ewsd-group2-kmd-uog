import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router";
import useEffectMagazineDetail from "../hooks/useEffectMagazineDetail";
import useEffectArticleDetail from "../hooks/useEffectArticleDetail";

let InlineTextField = forwardRef(function ({required}, ref) {
    return (
        <div 
            className="
            outline-none 
            flex items-center 
            p-[10px]
            w-[250px] h-[38px] 
            border-2 border-slate-200 focus-within:border-indigo-500
            rounded
            transition-all
            "
        >
            <input ref={ref} className="outline-none" required={required}/>
        </div>
    )
})

function ImageFile({src, onDelete}) {
    return (
    <div 
        className="relative aspect-[1/0.75] border rounded bg-white overflow-hidden cursor-default"
        onClick={e => {
            e.preventDefault()
            e.stopPropagation()
        }}
    >
        <img className="object-cover w-full h-full" src={src}/>
        <button 
            className="
            absolute
            w-[18px] h-[18px]
            -top-[6px] right-0
            hover:opacity-25
            transition-all
            "
            onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                onDelete && onDelete()
            }}
        >
            x
        </button>
    </div>
    )
}

function ClickToUploadLabel() {
    return <div 
        className="
        absolute w-full h-full
        flex flex-col items-center justify-center
        "
    >
        <img src={null} className="w-[24px] h-[24px]"/>
        <p>Click to upload</p>
    </div>
}


function UpdateContributionPage() {
    
    let { id } = useParams()
    let auth = useContext(AuthContext)
    let navigate = useNavigate()

    let article = useEffectArticleDetail(id)
    let [magazine] = useEffectMagazineDetail(article?.contribution?.closure_id)

    console.log("Magazine", magazine)
    let nameField = useRef()
    let descField = useRef()

    let fileInput = useRef()
    let [docFile, setDocFile] = useState(null)

    let imageInput = useRef()
    let [imageFiles, setImageFiles] = useState([])

    let [error, setError] = useState()
    let [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log("Refs", nameField, descField)
        nameField.current.value = article?.contribution?.name
        descField.current.value = article?.contribution?.description
    }, [article])

    function updateDocSrcState() {
        let input = fileInput.current
        console.log(input.files)
        setDocFile(input.files[0])
    }

    function getSelectedImageFiles() {
        let input = imageInput.current
        console.log("Files", input.files)
        let files = input.files
        if (!files) files = []

        files = Array.from(files).filter( (_, i) => i < 5)
        return files
    }

    function getFormData() {
        let f = new FormData()
        f.set('name', nameField.current.value)
        f.set('description', descField.current.value)
        f.set('closure_id', magazine?.id)
        f.set('files', docFile)
        // imageFiles.forEach((x, i) => {
        //     f.set(`images[${i}]`, x)
        // })
        return f
    }

    async function updateArticle() {
        setError(null)
        try {
            let res = await fetch(`http://127.0.0.1:8000/api/contributions/update/${id}`, {
                method: "POST",
                headers: {
                    'accept': 'application/json',
                    'authorization': `Bearer ${auth}`
                },
                body: getFormData()
            })

            console.log("status", res.status)
            // if success
            if (res.status >= 200 && res.status < 300) {
                // goto previous page
                navigate(-1)
            } else {
                setError(`Unable to upload submission(${res.status})`)
            }
            let text = await res.text()
            console.log("res", text)
        } catch (error) {
            console.log(error)
            setError(`Unable to upload submission(${error})`)
        }
    }

    return (
    <div 
        className="
        fixed left-0 top-0 flex w-screen h-screen bg-black/90 p-[25px] md:px-[150px] md:py-[50px] overflow-hidden
        "
    >
        {/* Content View */}
        <form 
            className="
            w-full min-h-[500px] max-h-full
            my-auto 
            p-[25px]
            flex flex-col items-center
            bg-white 
            overflow-scroll
            "
            // onClick={e => {
            //     e.preventDefault()
            //     e.stopPropagation()
            // }}
            onSubmit={e => {
                e.preventDefault()
                updateArticle()
            }}
        >
            {/* Center View */}
            <div className="flex flex-col gap-[30px] max-w-full md:max-w-[600px]">
                <div>
                    <h1 className="text-center text-xl font-bold">{magazine?.name}</h1>
                    <p className="text-center text-lg font-normal">New Submission</p>
                </div>
                <div/>
                {/* Input Row */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-[5px] md:gap-[25px]">
                    <label className="grow text-left">Title*</label>
                    {/* <InlineTextField ref={nameField} required/> */}
                    <div 
                        className="
                        outline-none 
                        flex items-center 
                        p-[10px]
                        w-[250px] h-[38px] 
                        border-2 border-slate-200 focus-within:border-indigo-500
                        rounded
                        transition-all
                        "
                    >
                        <input ref={nameField} className="outline-none" required/>
                    </div>
                </div>
                {/* Input Row */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-[5px] md:gap-[25px]">
                    <label className="grow text-left">Description*</label>
                    {/* <InlineTextField ref={descField} required/> */}
                        <div 
                            className="
                            outline-none 
                            flex items-center 
                            p-[10px]
                            w-[250px] h-[38px] 
                            border-2 border-slate-200 focus-within:border-indigo-500
                            rounded
                            transition-all
                            "
                        >
                            <input ref={descField} className="outline-none" required/>
                        </div>
                </div>

                {/* File Row */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-[5px] md:gap-[25px]">
                    <label className="grow text-left">File*</label>
                    
                    <div 
                        className="
                        relative flex items-center 
                        w-[250px]
                        transition-all
                        "
                    >
                        <input 
                            ref={fileInput} className="absolute w-[1px] h-full opacity-0 outline-none" type="file" 
                            // word file only
                            accept=".doc,.docx"
                            required
                            onChange={e => {
                                updateDocSrcState()
                            }}
                        />
                        <button
                            className="
                            px-[14px] py-[10px] 
                            max-w-[250px]
                            text-white text-sm font-bold
                            bg-gray-600 rounded
                            " 
                            onClick={e => {
                                e.preventDefault()
                                fileInput.current.showPicker()
                            }}>
                            {docFile ? docFile.name : "Browse"}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-start md:items-center gap-[5px] md:gap-[25px]">
                    {/* <p className="md:max-w-[400px] text-center">By clicking Submit button, you agree to the Terms and Conditions of Large University.</p> */}
                    {error && <p className="text-red-500 md:max-w-[400px] text-center">{error}</p>}
                </div> 
                {/* Input Row */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-[5px] md:gap-[25px]">
                    <button
                        className="
                        grow px-[14px] py-[8px] 
                        text-white text-sm font-bold
                        bg-indigo-600 rounded
                        " 
                        onClick={e => {}}>
                        Update
                    </button>
                </div>
            </div>
        </form>
    </div>
    );
}

export default UpdateContributionPage;