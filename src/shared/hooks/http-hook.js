import { useEffect } from "react";

export const useHttpClient = () => {
    const [error, setError] =useState()
    const [isLoading, setIsLoading] =useState(false);
    
    const activatedHttpRequest = useRef()


    const sendRequest =useCallback( async (url, method = 'GET', body =null, headers={}) => {
        setIsLoading(true); 
        const httpAbortController= new AbortController();
        activatedHttpRequest.current.push(httpAbortController);

        try {
            const response = fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortController.signal
            })
    
            const responseData = await response.json();
    
            if(!response.ok) {
                throw new Error (responseData.message)
            }

            return responseData;
        } catch (err){
            setError(err.message);
        }
        setIsLoading(false);
    }, []);

    const clearError = () => {
        setError(null)
    }

    useEffect(() => {
        return () => { activatedHttpRequest.current.forEach(ControlAbort => ControlAbort.abort())}
    } , []);

    return {isLoading:isLoading, error:error, sendRequest:sendRequest, clearError}

};