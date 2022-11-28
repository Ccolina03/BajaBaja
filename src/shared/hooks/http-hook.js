import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
    const [error, setError] =useState()
    const [isLoading, setIsLoading] =useState(false);
    
    const activatedHttpRequest = useRef([])


    const sendRequest =useCallback( async (url, method = 'GET', body =null, headers={}) => {
        setIsLoading(true); 
        const httpAbortController= new AbortController();
        activatedHttpRequest.current.push(httpAbortController);

        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortController.signal
            })
    
            const responseData = await response.json();

            activatedHttpRequest.current= activatedHttpRequest.current.filter(
                reqCtrl => reqCtrl !== httpAbortController);
        
    
            if(!response.ok) {
                throw new Error (responseData.message)
            }

            setIsLoading(false)
            return responseData;

        } catch (err){
            console.log(err)
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    }, []);

    const clearError = () => {
        setError(null)
    }

    useEffect(() => {
        return () => { activatedHttpRequest.current.forEach(ControlAbort => ControlAbort.abort());}
    } , []);

    return {isLoading, error, sendRequest, clearError}

};