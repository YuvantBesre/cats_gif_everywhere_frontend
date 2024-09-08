import { toastProps } from "../../App"

interface ToastProps {
    data : toastProps,
    onChange : (data : toastProps) => void
}

const SnackBar = (props : ToastProps) => {
    const toastData = props.data;

    return (
        <div className={`border flex items-center justify-between p-2 rounded w-[50%] mx-auto mb-[20px] ${toastData.type == 'error' ? 'border-[red] text-[red]' : ''}`}>
            {toastData.message}
            <svg onClick={() => props.onChange({
                show: false,
                message: '',
                type: 'error'
            })} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 ml-[20px] cursor-pointer">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
        </div>
    )
}

export default SnackBar