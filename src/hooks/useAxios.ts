import axios from "axios";

const Axios = axios.create({
    baseURL : '',
    timeout: 10000,
    timeoutErrorMessage : 'Request Timeout',
    xsrfCookieName : 'csrftoken',
    xsrfHeaderName : 'X-CSRFTOKEN'
});

const useAxios = () => {
    const requestGET = async (url : string, params : any, headers : any, successResponse : any, errorResponse : any, additionalOptions : any = {}) => {
        try {
            const response = await Axios.get(url, {
                params : params,
                headers : headers,
                ...additionalOptions
            });       
            successResponse(response);
        }

        catch(error : any) {
            console.log(error);
            if(errorResponse) {
                errorResponse(error)
            }
        }
    }
    
    const requestPOST = async (url : string, params : any, headers : any, successResponse : any, errorResponse : any, query : any = {}) => {
        try {
            const response = await Axios.post(url, params, { 
                headers : headers,
                params : query
            });       
            successResponse(response);
        }
        catch(error : any) {
            console.log(error);
            if(errorResponse) {
                errorResponse(error);
            }
        }
    }

    return {
        requestGET,
        requestPOST
    }
}

export default useAxios