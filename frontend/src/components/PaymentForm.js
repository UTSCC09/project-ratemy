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
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/",
      },
      redirect: "if_required",
    });

    if (error) {
      console.error(error);
      setPaymentError(true);
      setPaymentSuccess(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setPaymentSuccess(true);
      setPaymentError(false);
      console.log("Payment successful");
    } else {
      console.log("Payment failed");
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
        {paymentSuccess && (
          <div className="text-green-600">
            Payment successful! Enjoy the full features of AI
          </div>
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
