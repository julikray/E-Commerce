// import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
// import React, { useState } from 'react'

// function CheckOutForm({orderId}) {

//     localStorage.setItem('orderId' , orderId)
//     const stripe = useStripe()
//     const elements = useElements()
//     const [email , setEmail] = useState('')
//     const [message , setMessage] = useState(null)
//     const [isLoading , setIsLoading] = useState(false)

//     const paymentElementOptions = {
//         layout : 'tabs'
//     }

//     const submit = async(e) => {
//         e.preventDefault()

//         if(!stripe || !elements){
//             return
//         }

//         setIsLoading(true)
//         const {error} = await stripe.confirmPayment({
//             elements,
//             confirmParams: {
//                 return_url: `${import.meta.env.VITE_API_BASE_URL}/order/confirm`
//             }
//         })

//         if(error.type === 'card_error' || error.type === 'validation_error' ){
//             setMessage(error.message)
//         } else {
//             setMessage("An unexpected error occured")
//         }

//         setIsLoading
//     }

//   return (
//      <form onSubmit={submit} id='payment-form' className=' mt-5' >
//         <LinkAuthenticationElement id='linkAuth' onChange={(e) => setEmail(e.target.value) } />
//         <PaymentElement id='paymentElement' options={paymentElementOptions} />

//         <button disabled={isLoading || !stripe || !elements } id='submit' className='px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white  mt-5' >

//         <span id='btn-text' >
//             {
//                 isLoading ? <div>Loading.....</div> : "Pay now"
//             }
//         </span>

//         </button>
//         {
//             message && <div>{message} </div>
//         }

//      </form>
//   )
// }

// export default CheckOutForm


import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import React, { useState } from 'react';

function CheckOutForm({ orderId ,clientSecret  }) {
  localStorage.setItem('orderId', orderId);

  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const paymentElementOptions = {
    layout: 'tabs',
  };

//   const submit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setIsLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       clientSecret,
//       confirmParams: {
//         return_url: `${import.meta.env.VITE_API_BASE_URL}/order/confirm`,
//       },
//     });

//     if (error?.type === 'card_error' || error?.type === 'validation_error') {
//       setMessage(error.message);
//     } else   {
//       setMessage('An unexpected error occurred');
//     }

//     setIsLoading(false);
//   };

const submit = async (e) => {
  e.preventDefault();

  if (!stripe || !elements) {
    return;
  }

  setIsLoading(true);

  try {
    // ✅ Step 1: Submit all elements (this is required before confirming the payment)
    await elements.submit();

    // ✅ Step 2: Confirm the payment
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_API_BASE_URL}/order/confirm`,
      },
    });

    if (error?.type === 'card_error' || error?.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred');
    }
  } catch (error) {
    console.error('Payment submission failed:', error);
    setMessage('An unexpected error occurred');
  }

  setIsLoading(false);
};


  return (
    <form onSubmit={submit} id="payment-form" className="mt-5">
      <LinkAuthenticationElement
        id="linkAuth"
        onChange={(event) => {
          if (event && event.value) {
            setEmail(event.value.email || '');
          }
        }}
      />

      <PaymentElement id="paymentElement" options={paymentElementOptions} />

      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white mt-5"
      >
        <span id="btn-text">{isLoading ? 'Loading...' : 'Pay now'}</span>
      </button>

      {message && <div className="mt-3 text-red-600">{message}</div>}
    </form>
  );
}

export default CheckOutForm;
