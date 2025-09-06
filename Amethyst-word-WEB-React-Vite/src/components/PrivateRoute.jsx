import { replace } from "lodash";
import React ,{useEffect}from "react";
import { useNavigate } from "react-router-dom";
const PrivateRoute =({element})=>{
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(()=>{
        if(!token)
        {
            navigate('/login',{replace: true});
        }
    },[token, navigate])
    return token? element : null
}
export default PrivateRoute;
