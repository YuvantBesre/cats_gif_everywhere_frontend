import { useEffect, useRef } from "react"

interface AddEditFormProps {
    data : any
    onFormSubmit : (formData : formPayload) => void,
    onClose : () => void,
    modalOpen : boolean
}

export interface formPayload {
    id? : string
    title : string,
    image : File | null
}

const AddEditForm = (props : AddEditFormProps) => {
    const formData = useRef<formPayload>({
        title : props.data.title || '',
        image : null
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
                <input accept="image/*, image/avif" onChange={(e) => formData.current.image = e.target.files?.length ? e.target.files[0] : null } type="file" className="rounded mt-[10px] h-[40px]" name="" id="" />
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