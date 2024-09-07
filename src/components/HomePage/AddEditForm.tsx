import { useEffect, useRef, useState } from "react"

interface AddEditFormProps {
    data : any
    onFormSubmit : (formData : formPayload) => void,
    onClose : () => void,
    modalOpen : boolean
}

export interface formPayload {
    id? : string
    title : string,
    image : File | string | any
}

const AddEditForm = (props : AddEditFormProps) => {
    const [fileUploadHappend, setFileUploadHappend] = useState<boolean>(false);
    const formData = useRef<formPayload>({
        title : props.data.title || '',
        image : props.data.image ? props.data.image.split('https://neox-development-s3.s3.ap-south-1.amazonaws.com/')[1] : null
    });

    useEffect(() => {
        if(Object.keys(props.data).length) {
            formData.current.id = props.data.id;
        }

        if(!props.modalOpen) {
            formData.current.title = '';
            formData.current.image = null;
        }
    }, [props.modalOpen])

    const handleOnSubmit = (event : any) => {
        event.preventDefault();
        props.onFormSubmit(formData.current);
    }

    return (
        <form className="text-black p-8 flex flex-col gap-y-8" onSubmit={handleOnSubmit}>
            <h2 className="font-semibold text-[18px] flex justify-between items-center">
                <span>+ Add Data </span>

                <svg onClick={props.onClose} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 cursor-pointer">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
            </h2>
            <div className="flex flex-col">
                <label htmlFor=""> Title </label>
                <input defaultValue={formData.current.title} onChange={(e) => formData.current.title = e.target.value} type="text" className="border rounded mt-[10px] h-[40px] px-2" name="" id="" />
            </div>
            <div className="flex flex-col">
                <label htmlFor=""> Image </label>
                <label htmlFor="file-upload-form" className="border cursor-pointer mt-[10px] h-[40px] px-2 flex items-center"> 
                    Upload File 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 ml-[10px]">
                        <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
                </label>

                {
                    formData.current.image != null && typeof(formData.current.image) == 'string' &&
                    <div className="font-semibold mt-[10px]"> {formData.current.image} </div>
                }

                {
                    formData.current.image != null && typeof(formData.current.image) == 'object' &&
                    <div className="font-semibold mt-[10px]"> {} {formData.current.image.name} </div>
                }
                
                <input id="file-upload-form" accept="image/*, image/avif" onChange={(e) => {
                    formData.current.image = e.target.files?.length ? e.target.files[0] : null;
                    setFileUploadHappend(!fileUploadHappend);
                }} type="file" className="rounded mt-[10px] h-[40px] hidden" name="" />
            </div>

            <div>
                <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Submit
                </button>
            </div>
        </form>
    )
}

export default AddEditForm