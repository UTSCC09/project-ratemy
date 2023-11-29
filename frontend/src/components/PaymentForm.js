import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const PaymentForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/",
      },
    });

    if (result.error) {
      console.error(result.error.message);
      setPaymentError(true);
    } else {
      console.error("An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-5">
        <div className="text-3xl">
          Total Amount: <span className="font-bold">$9.99</span>
        </div>
        <PaymentElement />
        {paymentError && (
          <div className="text-red-600">Error with the payment, try again!</div>
        )}
        <button
          type="submit"
          className="rounded-xl px-2 py-3 w-fit 
            bg-purple-500 text-white font-bold hover:bg-purple-700 disabled:bg-purple-300 disabled:border-purple-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
