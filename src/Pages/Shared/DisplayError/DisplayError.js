import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const DisplayError = () => {
   const navigate=useNavigate()
    const{logOut}=useContext(AuthContext);
    const error=useRouteError()
    const handleLogOut=()=>{
        logOut()
        .then(()=>{
        navigate('/login')
        })
        .catch(err=>console.error(err))
       
    }
    return (
        <div>
            <p>Somrthing went wrong..</p>
            <p>{error.statusText || error.message}</p>
            <h4>please LogOut<button onClick={handleLogOut}>SingOut</button></h4>
        </div>
    );
};

export default DisplayError;