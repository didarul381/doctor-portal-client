import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useAdmin from '../../Hook/useAdmin';
import Loding from '../../Pages/Shared/Loding/Loding';


const AdminRoute = ({children}) => {
    const {loding,user}=useContext(AuthContext);
    const[isAdmin,isAdminLoding]=useAdmin(user?.email)
    const location=useLocation()

if(loding || isAdminLoding){
    return <Loding></Loding>
    // <progress className='progress w-56'></progress>
}
   if(user && isAdmin){
    return children;
   }
    return<Navigate to='/login' state={{from:location}} replace></Navigate>
 
};


export default AdminRoute;