import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const PageNotFound = ({path}: {path: string}) => {
    const navigate = useNavigate()

    useEffect(()=>{
        navigate(path)
    },[])

    return (
        <div>
            переадресация...
        </div>
    );
};

export default PageNotFound;