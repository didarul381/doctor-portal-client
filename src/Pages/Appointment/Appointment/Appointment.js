import React, { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvilableAppointments from '../AvilableAppointments/AvilableAppointments';

const Appointment = () => {
    const[selectDate,setSelectDate]=useState(new Date());
    return (
        <div>
            <h2>Appointent</h2>
            <AppointmentBanner selectDate={selectDate} setSelectDate={setSelectDate}>

            </AppointmentBanner>
            <AvilableAppointments selectDate={selectDate} setSelectDate={setSelectDate}></AvilableAppointments>
        </div>
    );
};

export default Appointment;