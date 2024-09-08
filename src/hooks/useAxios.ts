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
    
    const requestPOST = async (url : string, params : any, headers : any = {}, query : any = {}) => {
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

    // AXIOS ASYNC PUT REQUEST
    const requestPUT = async (url : string, params : any,  headers : any = {}) => {
        try {
            const response = await Axios.put(url, params, { headers : headers });       
            return response;
        }
        catch(error : any) {
            console.log(error);
            return error;
        }
    }

    // AXIOS ASYNC PATCH REQUEST
    const requestPATCH = async (url : string, params : any,  headers : any = {}) => {
        try {
            const response = await Axios.patch(url, params, { headers : headers });       
            return response;
        }
        catch(error : any) {
            console.log(error);
            return error;
        }
    }

    const requestDELETE = async (url : string, params : any = {},  headers : any = {}) => {
        try {
            const response = await Axios.delete(url, { 
                headers : headers, 
                data : params
            });       

            return response;
        }
        catch(error : any) {
            console.log(error);
            return error;
        }
    }

    return {
        requestGET,
        requestPOST,
        requestPUT,
        requestPATCH,
        requestDELETE
    }
}

export default useAxios