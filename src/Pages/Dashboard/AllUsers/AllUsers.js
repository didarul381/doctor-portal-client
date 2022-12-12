import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllUsers = () => {
    const{data:users=[],refetch}=useQuery({
        queryKey:['users'],
        queryFn: async()=>{
            const res= await fetch('http://localhost:5000/users');
            const data=await res.json();
            return data;
        }
    });
    const handleAdmine =(id)=>{
      fetch(`http://localhost:5000/users/admin/${id}`,{
        method:"PUT",
        headers:{
            authorization:`bearer ${localStorage.getItem('accessToken')}`
        }
      })
      .then(res=>res.json())
      .then(data=>{
        // console.log(data)
        if(data.modifiedCount>0){
            alert("success...")
            refetch();

        }
      })
    }
    return (
        <div>
            <h2>All....</h2>
            <div className="overflow-x-auto">
  <table className="table w-full">
  
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>email</th>
        <th>Admit</th>
        <th>Delet</th>
      </tr>
    </thead>
    <tbody>
     
        {
            users.map((user,i)=><tr key={user._id}>
                <th>{i+1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user?.role!=='admin' && <button onClick={()=>handleAdmine(user._id)} className='btn btn-primary'>Make Admin</button>}</td>
                <td><button className='btn btn-xl btn-danger'>Delet</button></td>
                <td>Blue</td>
              </tr>
             
             

            )
        }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllUsers;