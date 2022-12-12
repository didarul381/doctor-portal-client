import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Loding from '../../Shared/Loding/Loding';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvilableAppointments = ({selectDate,setSelectDate}) => {
    //const [appointmentOptions, setAppointmentOptions] = useState([]);
    const [treatment, setTreatment] = useState(null);
    const date=format(selectDate,'PP')
    const{data:appointmentoptions=[],refetch,isLoading}=useQuery({
      queryKey:['appointmentoptions',date],
      queryFn:()=> fetch(`http://localhost:5000/appointmentoptions?date=${date}`)
      .then(res=>res.json())
    })
     if(isLoading){
      return<Loding></Loding>
     }
    // useEffect(()=>{

    //     fetch('http://localhost:5000/appointmentoptions')
    //     .then(res=>res.json())
    //     .then(data=>setAppointmentOptions(data))
    // },[])
    return (
        <section className='mt-16'>
            <h3 className='text-center text-purple-800'>Available appointment date:{format(selectDate,'pp')}</h3>
       

            <div className='grid gap-6 grid-cols-1  md:grid-cols-2  lg:grid-cols-3'>
              {
                appointmentoptions.map(appointmentOption=><AppointmentOption 
                key={appointmentOption._id}
                appointmentOption={appointmentOption}
                setTreatment={ setTreatment}
                
                >


                </AppointmentOption>)
              }
            </div>
          {  treatment&&
              <BookingModal treatment={treatment} selectDate={selectDate}  setTreatment={ setTreatment}
              refetch={refetch}
              
              ></BookingModal>
          }
        </section>
        
    );
};

export default AvilableAppointments;