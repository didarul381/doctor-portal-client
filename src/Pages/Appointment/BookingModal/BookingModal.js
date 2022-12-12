import { format } from 'date-fns';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';

const BookingModal = ({treatment,selectDate , setTreatment,refetch}) => {
    const { name, slots ,price} = treatment;
    const date=format(selectDate,'PP');
    const{user}=useContext(AuthContext)
    const handleBooking=(event)=>{
        event.preventDefault();
        const form=event.target;
      
        const slot = form.slot.value;
        const names = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        // const date=form.data.value
        const booking = {
            appointmentDate: date,
            treatment:name,
            patient: names,
            slot,
            email,
            phone,
            price
        }
        fetch('http://localhost:5000/bookings',{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(booking)
        })
        .then(res=>res.json())
         .then(data=>{
            console.log(data)
            if(data.acknowledged){
              
                setTreatment(null)
                alert("Success")
                refetch();
            }else{
                alert(data.message);
            }
                
           
         })
        // console.log(booking)
       
    }
    return (
        <>
          {/* The button to open modal */}
     <label htmlFor="booking-modal" className="btn">open modal</label>

{/* Put this part before </body> tag */}
     <input type="checkbox" id="booking-modal" className="modal-toggle" />
     <div className="modal">
     <div className="modal-box relative">
    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
     <h3 className="text-lg font-bold">{treatment.name}</h3>
    <form onSubmit={handleBooking}>
    <input name='date' type="text" value={date} className="input w-full" />
    <select name="slot" className="select select-bordered w-full">
                            {
                                slots.map((slot, i) => <option
                                    value={slot}
                                    key={i}
                                >{slot}</option>)
                            }
                        </select>

                        <input name="name" type="text" placeholder="Your Name" readOnly defaultValue={user?.displayName} className="input w-full input-bordered" />
                        <input name="email" type="email" placeholder="Email Address"readOnly defaultValue={user?.email} className="input w-full input-bordered" />
                        <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" />       
    <br></br>
    <input type="submit" value="submit" className="btn btn-primary max-w-xs" />
    </form>
     </div>
     </div>  
        </>
    );
};

export default BookingModal;