import React from 'react';

const AppointmentOption = ({appointmentOption, setTreatment}) => {
    const{name,price ,slots}=appointmentOption;

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body text-center">
    <h2 className="text-center  text-purple-600">{name}</h2>
    <p>{slots.length>0?slots[0]:'Try another day'}</p>
    <p>{slots.length}{slots.length>1?'spaces':'space'}avaliable</p>
    <p>Price:{price}</p>
    <div className="card-actions justify-center">
      
      <label htmlFor="booking-modal" className="btn" onClick={()=>setTreatment(appointmentOption)}>Book appointment</label>
    </div>
  </div>
</div>
        </div>
    );
};

export default AppointmentOption;