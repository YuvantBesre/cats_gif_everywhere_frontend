import axios from "axios";

const Axios = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_BASE_URL,
    timeout: 10000,
    timeoutErrorMessage : 'Request Timeout',
    xsrfCookieName : 'csrftoken',
    xsrfHeaderName : 'X-CSRFTOKEN'
});

const useAxios = () => {
    const requestGET = async (url : string, params : any = {}, headers : any = {}, additionalOptions : any = {}) => {
        try {
            const response = await Axios.get(url, {
                params : params,
                headers : headers,
                ...additionalOptions
            });       
            return response
        }

        catch(error : any) {
            console.log(error);
            return error;
        }
    }
    
    const requestPOST = async (url : string, params : any, headers : any, query : any = {}) => {
        try {
            const response = await Axios.post(url, params, { 
                headers : headers,
                params : query
            });       
            return response
        }
        catch(error : any) {
            console.log(error);
            return error
        }
    }

    const requestPATCH = async (url : string, params : any, headers : any, query : any = {}) => {
        try {
            const response = await Axios.patch(url, params, { 
                headers : headers,
                params : query
            });       
            return response
        }
        catch(error : any) {
            console.log(error);
            return error
        }
    }

    return {
        requestGET,
        requestPOST,
        requestPATCH
    }
}

export default useAxios