import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useAdmine from '../Hook/useAdmin';
import Navbar from '../Pages/Shared/Navbar/Navbar';
const DashboardLayout = () => {
  const{user}=useContext(AuthContext)
  const[isAdmin]=useAdmine(user?.email)
    return (
        <div>
             <Navbar></Navbar>
             <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
     <div className="drawer-content">
      <Outlet></Outlet>
    
  
    </div> 
     <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80  text-base-content">
     
      <li><Link to='/dashboard'>My appointments</Link></li>
      {/* <li><Link to='dashboard/users'>All Users</Link></li> */}
     {
       isAdmin && <>
          <li><Link to='dashboard/users'>All Users</Link></li>
          <li><Link to='dashboard/adddoctor'>Add Doctor</Link></li>
          <li><Link to='/dashboard/managedoctor'>Manage Doctor</Link></li>
       </>
     }
    </ul>
  
  </div>
  </div>
        </div>
    );
};

export default DashboardLayout;