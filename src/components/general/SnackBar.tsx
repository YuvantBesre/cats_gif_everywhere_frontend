// import { useEffect, useState } from "react";

// function Snackbar(props : any) {    
//     const dispatch = useDispatch();
//     const { showToast, message, color, timeOut } = useSelector((state : any) => state.toast);
    
//     useEffect(() => {
//         if(showToast)
//             handleTimeuOuts();
//     }, [showToast])
    
    
//     // FUNCTIONS
//     const handleClose = () => {      
//         dispatch(closeSnackBar());
//     };

//     const handleTimeuOuts = () => {
//         if(timeOut !== -1) {
//             setTimeout(() => {
//                 dispatch(closeSnackBar());
//             }, timeOut);
//         }
//     }

//     return (
//         <>
//             {
//                 showToast && 
//                 <div 
//                     className='animateup flex justify-between text-white fixed bottom-5 left-5 z-[99999] drop-shadow-2xl shadow-xl px-4 py-3 rounded min-w-[350px]' style={{ backgroundColor : color }}>
//                     <p> {message} </p>
//                     <div onClick={handleClose} className="mx-2">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                     </div>
//                 </div>
//             }
//         </>
//     )
// }

// export default Snackbar