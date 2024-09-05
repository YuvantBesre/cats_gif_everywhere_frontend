import { ReactNode } from "react"

export interface ModalProps {
    children? : ReactNode,
    styles? : string,
    show : boolean,
    transition? : string
    containerClasses? : string
}

function Modal({ children, styles, show, transition, containerClasses }: ModalProps) {

    return (
        <div className="">
            {show ? (
                <>
                    <div
                        className={`${transition || 'animateup'} w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[99] outline-none focus:outline-none`}
                    >
                        <div className={`fixed lg:relative lg:bottom-none max-w-3xl w-full lg:my-6 bottom-0 bg-white ${styles} ${containerClasses}`}>
                            {/*content*/}
                            <div style={{ height : '100%' }} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                                {children}
                            </div>
                        </div>
                    </div>

                    {/* BACKDROP */}
                    <div className="opacity-70 fixed inset-0 z-[9] bg-black"></div>
                </>
            ) : null}
        </div>
    )
}

export default Modal