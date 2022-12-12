import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import AddDoctor from "../../Pages/Dashboard/Dashboard/AddDoctor/AddDoctor";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import ManageDoctor from "../../Pages/Dashboard/Dashboard/ManageDoctor/ManageDoctor";
import MyAppointment from "../../Pages/Dashboard/MyAppointment/MyAppointment";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import Singup from "../../Pages/Singup/Singup";
import AdminRoute from "../PrivateRoute/AdminRoute";


import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>, 
        errorElement:<DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/singup',
                element: <Singup></Singup>
            },
            {
                path:'/appointment',
                element:<Appointment></Appointment>
            }
        ]
      
    },
    {
        path:'/dashboard',
          element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
          errorElement:<DisplayError></DisplayError>,
          children:[
            {
                path:'/dashboard',
                element:<MyAppointment></MyAppointment>
            },
            {
                path:'dashboard/users',
                element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
               
            },
            {
                path:'dashboard/adddoctor',
                element:<AdminRoute><AddDoctor></AddDoctor></AdminRoute>
               
            },
            {
                path:'/dashboard/managedoctor',
                element:<AdminRoute><ManageDoctor></ManageDoctor></AdminRoute>
               
            },
            {
                path:'/dashboard/payment/:id',
                element:<Payment></Payment>,
                loader:({params})=>{
                    return fetch(`http://localhost:5000/bookings/${params.id}`)
                }
               
            }

          ]

    }
])

export default router;