"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51OHVzAJac0biPzxDgkEsvPO2s7hKHLFIYQKxSE9crSnkDWHJLUwD3y8QentAeWDWZUAVCjGbpMWpbRqVjvSDIPPU00Dcf9qdbb"
);

const Payment = () => {
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState(null);

  async function getKey() {
    try {
      await fetch("http://localhost:5000/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
        });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getKey();
  }, []);

  const options = {
    clientSecret,
  };

  return (
    <div className="px-4 my-28 max-w-3xl mx-auto space-y-5">
      <ArrowBackIcon
        fontSize="large"
        onClick={() => {
          navigate(-1);
        }}
      />
      <div className="text-5xl font-bold">Upgrade to Pro!</div>
      <div className="text-2xl text-gray-600">
        One-time payment for unlimited AI calls, chat option with AI, extra AI
        prompts, and much more!
      </div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
