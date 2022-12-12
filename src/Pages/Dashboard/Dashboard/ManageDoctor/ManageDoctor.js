
import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal';
import Loding from '../../../Shared/Loding/Loding';

const ManageDoctor = () => {
    const[deletDoctor,setDeletDoctor]=useState(null);
    const closeModal=()=>{
        setDeletDoctor(null)
    }
   
    const{data:doctors,isLoading,refetch}=useQuery({
        queryKey:['doctors'],
        queryFn: async()=>{
            try{

                const res=await fetch('http://localhost:5000/doctors',{
                    headers:{
                        authorization:`bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data=await res.json();
                return data;
            }catch(err){

            }
        }
    });
   
    const handleDeletDoctor=(doctor)=>{
        fetch(`http://localhost:5000/doctors/${doctor._id}`,{
           method:'DELETE',
           headers:{
               authorization:`bearer ${localStorage.getItem('accessToken')}`
           }
           
        })
        .then(res=>res.json())
           .then(data=>{
              console.log(data)
              if( data.deletedCount>0){
                alert("Success..")
                    
                    refetch();
               }
            
             
           })
       }
    if(isLoading){
        return <Loding></Loding>
    }
    return (
        <div>
            <h2>Manage Doctor..{doctors?.length}</h2>
            <div className="overflow-x-auto">
  <table className="table w-full">
    
    <thead>
      <tr>
        <th></th>
        <th>Avater</th>
        <th>Name</th>
        <th>Email</th>
        <th>Specialty</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
     {
        doctors.map((doctor,i)=> <tr key={doctor._id}>
           
              <th>{i+1}</th>
              <td>
              <div className="avatar">
         <div className="w-24 rounded-full">
       <img src={doctor.image} alt='' />
         </div>
         </div>
              </td>
              <td>{doctor.name}</td>
              <td>{doctor.email}</td>
              <td>{doctor.specialty}</td>
              <td>
              <label onClick={()=>setDeletDoctor(doctor)} htmlFor="confirmation-modal" className="btn">delet</label>
             
                {/* <button className='btn btn-primary'>Delet</button> */}
                </td>
            </tr>)
     }
      
     
    </tbody>
  </table>
   
</div>
{
    deletDoctor && <ConfirmationModal 
    title={`Are you sure to dalet`}
    message={`if you delet ${ deletDoctor.name}`}
    closeModal={ closeModal}
    handleDeletDoctor={handleDeletDoctor}
    successBtnName="Delete"
    modalData={deletDoctor}
    >

    </ConfirmationModal>
   }
</div>
    );
};

export default ManageDoctor;