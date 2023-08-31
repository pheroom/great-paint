import {useState} from "react";

export const useFetching = (callback, initIsLoading = false): [(...args) => void, boolean, string] => {
    const [isLoading, setIsLoading] = useState(initIsLoading);
    const [error, setError] = useState('');

    const fetching = async (...args) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (e) {
            console.log(e)
            setError(e.message);
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error]
}