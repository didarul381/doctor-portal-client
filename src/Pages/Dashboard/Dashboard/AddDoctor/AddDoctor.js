import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Loding from '../../../Shared/Loding/Loding';
const AddDoctor = () => {
    const{register, formState: { errors },handleSubmit}=useForm();
    const imghostkey=process.env.REACT_APP_imgbb_Key;
    const navigate=useNavigate()
    const{data:specialties,isLoading}=useQuery({
        queryKey:['specialty'],
        queryFn:async()=>{
            const res=await fetch('http://localhost:5000/appointmentSpecialty');
            const data=await res.json();
            return data;

            
        }
    }) 
    const handleAddDoctor=(data)=>{
           console.log(data);
          const image=data.img[0];
          const formData= new FormData();
          formData.append('image',image)
          const url=`https://api.imgbb.com/1/upload?key=${imghostkey}`;
          fetch(url,{
            method:'POST',
            body: formData
          })
          .then(res=>res.json())
          .then(imgData=>{
            if(imgData.success){
            console.log(imgData.data.url);
            const doctor={
                name:data.name,
                email:data.email,
                specialty:data.speciality,
                image:imgData.data.url
            }

            //save doctor information to the database
            fetch('http://localhost:5000/doctors',{
                method:'POST',
                headers:{
                    'content-type':'application/json',
                    authorization:`bearer ${localStorage.getItem('accessToken')}`
                },
                body:JSON.stringify(doctor)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                alert("success")
                navigate('/dashboard/managedoctor')
            })
            }
          })
    }
    if(isLoading){
        return <Loding></Loding>
    }
    return (
        <div className='w-96 p-7'>
            <h2>ADD a Doctor</h2>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Name</span></label>
                    <input type="text" {...register("name", {
                        required: "Name is Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Email</span></label>
                    <input type="email" {...register("email", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">speciality</span></label>
                    <select className="select select-secondary w-full max-w-xs"
                     {...register("speciality")}
                    
                    >
            <option disabled selected>speciality</option>
              {
                specialties.map(specialty=><option
                key={specialty._id}
                value={specialty.name}
                >{specialty.name}</option>)
              }
           {/* <option>C#</option> */}
  
              </select>
              <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Image</span></label>
                    <input type="file" {...register("img", {
                        required: "img is Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                </div>
                   
                </div>
                <input className='btn btn-accent w-full mt-4' value="Add a Doctor" type="submit" />
               
            </form>
        </div>
    );
};

export default AddDoctor;