import { forwardRef, useContext, useRef, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router";
import useEffectMagazineDetail from "../hooks/useEffectMagazineDetail";
import BorderedButton from "../components/BorderedButton";

import UploadIcon from "../assets/imageupload.png"
import CrossIcon from "../assets/cross.png"
import FilledButton from "../components/FilledButton";
import apiConfig from "../configs/api.config";
import LoadingIndicator from "../components/LoadingIndicator";


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
            top-[2px] right-[2px]
            hover:opacity-25
            transition-all
            "
            onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                onDelete && onDelete()
            }}
        >
            <img className="w-[15px] h-[15px]" src={CrossIcon}/>
        </button>
    </div>
    )
}

function ClickToUploadLabel() {
    return <div 
        className="
        absolute w-full h-full
        flex flex-col gap-[10px] items-center justify-center
        "
    >
        <img src={UploadIcon} className="w-[24px] h-[24px]"/>
        <p className="text-sm text-dark-200">Click to upload image</p>
    </div>
}


function UploadPage() {
    
    let { magazineId } = useParams()
    let auth = useAuthContext()
    let navigate = useNavigate()

    let [magazine] = useEffectMagazineDetail(magazineId)
    
    console.log("Magazine", magazine)
    let nameField = useRef()
    let descField = useRef()

    let fileInput = useRef()
    let [docFile, setDocFile] = useState(null)

    let imageInput = useRef()
    let [imageFiles, setImageFiles] = useState([])

    let [error, setError] = useState()
    let [loading, setLoading] = useState(false)

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
        f.set('closure_id', magazineId)
        f.set('files', docFile)
        imageFiles.forEach((x, i) => {
            f.set(`images[${i}]`, x)
        })
        
        return f
    }

    async function uploadArticle() {
        setError(null)
        setLoading(() => true)
        try {
            let res = await fetch(
                apiConfig.path.articleUpload(), {
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
            } else if (res.status === 413) {
                setError("Total file size exceeds limit of 8 MB.")
            } else {
                setError(`Unable to upload submission(${res.status})`)
            }
            let text = await res.text()
            console.log("res", text)
        } catch (error) {
            console.log(error)
            setError(`Unable to upload submission(${error})`)
        }
        setLoading(() => false)
    }

    return (
    <div 
        className="
        fixed 
        left-0 top-0 
        z-[21000]
        flex w-screen h-screen bg-black/90 p-[25px] md:px-[150px] md:py-[50px] overflow-hidden
        "
        onClick={e => {
            e.stopPropagation()
            e.preventDefault()
            navigate(-1)
        }}
    >
        {/* Content View */}
        <form 
            className="
            w-full min-h-[500px] max-h-full
            mb-auto 
            flex flex-col items-center
            bg-white 
            overflow-scroll
            rounded-[14px]
            "
            onClick={e => { e.stopPropagation() }}
            onSubmit={e => {
                e.preventDefault()
                e.stopPropagation
                uploadArticle()
            }}
        >
            {/* Center View */}
            <div className="flex flex-col items-center gap-[30px] max-w-full w-full">
                <div className="w-full bg-secondary-200 py-[12px] sticky top-0 z-[10]">
                    <h1 className="text-center text-lg font-bold">{magazine?.name}</h1>
                    <p className="text-center text-sm font-normal">New Submission</p>
                </div>
                <div/>
                {/* Input Row */}
                <div className="max-w-full md:max-w-[500px] flex flex-col items-center md:items-stretch gap-[30px] mb-[25px]">
                    <div className="flex flex-col md:flex-row items-start gap-[5px] md:gap-[25px]">
                        <label className="grow text-left">Title*</label>
                        {/* <InlineTextField ref={nameField} required/> */}
                        <div 
                            className="
                            outline-none 
                            flex items-center 
                            px-[10px] py-[4px]
                            w-[250px] h-[38px] 
                            border border-dark-100 focus-within:border-secondary-500
                            rounded
                            transition-all
                            "
                        >
                            <input ref={nameField} className="outline-none" required/>
                        </div>
                    </div>
                    {/* Input Row */}
                    <div className="flex flex-col md:flex-row items-start gap-[5px] md:gap-[25px]">
                        <label className="grow text-left">Description*</label>
                        {/* <InlineTextField ref={descField} required/> */}
                        <div 
                            className="
                            outline-none 
                            flex items-center 
                            px-[10px] py-[4px]
                            w-[250px] h-[100px] 
                            border border-dark-100 focus-within:border-secondary-500
                            rounded
                            transition-all
                            "
                        >
                            <textarea 
                            ref={descField} 
                            className="
                            outline-none w-full h-full resize-none
                            text-sm
                            " 
                            required
                            />
                        </div>
                    </div>

                    {/* File Row */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-[5px] md:gap-[25px]">
                        <label className="grow text-left">File*</label>
                        
                        <div 
                            className="
                            relative flex items-center 
                            w-[250px]
                            gap-[10px]
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
                            {!docFile && <BorderedButton title="Browse" onClick={e => {
                                e.preventDefault()
                                fileInput.current?.showPicker()
                            }}/>}
                            {!docFile && <p className="text-sm text-dark-200">.docx</p>}
                            {docFile && (
                                <button 
                                className="border bg-dark-100 p-[6px] rounded text-xs"
                                onClick={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    fileInput.current?.showPicker()
                                }}>
                                    {docFile?.name ?? ""}
                                </button>
                            )}
                        </div>
                    </div>
                    
                    {/* Images */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-[5px] md:gap-[25px]">
                        <label className="grow text-left">Images*</label>
                        
                        <div 
                            className="
                            relative
                            flex items-center 
                            w-[250px]
                            transition-all
                            "
                        >
                            <input 
                                ref={imageInput} 
                                className="absolute w-[1px] opacity-0 h-full outline-none" type="file" 
                                // word file only
                                accept="image/*"
                                onChange={e => {
                                    setImageFiles(getSelectedImageFiles())
                                }}
                                multiple
                            />
                            <div
                                className="
                                relative
                                grid grid-cols-3
                                gap-[5px]
                                p-[10px]
                                w-[250px] min-h-[125px] 
                                items-start
                                border border-dark-1 rounded
                                bg-[#f8f8f8]
                                hover:border-secondary-500
                                cursor-pointer
                                transition-all
                                " 
                                onClick={e => {
                                    e.preventDefault()
                                    imageInput.current.showPicker()
                                }}>
                                { imageFiles.length === 0 && <ClickToUploadLabel/> }
                                {imageFiles.map(x => URL.createObjectURL(x)).map((src, i) => {
                                    return <ImageFile 
                                        key={i} src={src}
                                        onDelete={() => {
                                            setImageFiles(
                                                imageFiles.filter((v, index) => index !== i)
                                            )
                                        }}
                                    />
                                })}
                            </div>
                            
                        </div>
                    </div>
                    <div className="flex flex-col items-start md:items-center gap-[5px] md:gap-[25px]">
                        <p className="md:max-w-[400px] text-left text-sm text-dark-200">
                            By clicking Submit button, you agree to the <a className="text-secondary-500" href="#"><u>Terms and Conditions</u></a> of Large University.
                        </p>
                        {error && <p className="text-red-500 md:max-w-[400px] text-center text-sm">{error}</p>}
                    </div> 
                    {/* Input Row */}
                    <div className="flex w-full justify-center gap-[5px] md:gap-[25px]">
                        {!loading && <FilledButton className="px-[75px] shadow" title="Submit"/>}
                        {loading && <LoadingIndicator/>}
                    </div>
                </div>
            </div>
        </form>
    </div>
    );
}

export default UploadPage;