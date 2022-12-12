import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loding from '../../Shared/Loding/Loding';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPR_PK);

const Payment = () => {
    const boking =useLoaderData();
    const navigation=useNavigation()
        if(navigation.state==="loading"){
              return  <Loding></Loding>
        }
    
    return (
        <div>
            <h2 className='text-3xl'>Payment for {boking.treatment}</h2>
            <p className='text-3xl'>Please pay {boking.price}</p>
            <div className='w-96 my-12'>
            <Elements stripe={stripePromise}>
      <CheckOutForm boking={boking} />
    </Elements>
            </div>
        </div>
    );
};

export default Payment;

// U$4856F2-/!DPrn