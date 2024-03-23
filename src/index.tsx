import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


const stripePromise = loadStripe(
  "pk_test_51NpsD9DHIQxG8E4lE74TOjNRhD52ODDWBPdRYaZYWt83cPOemyoqqNiLCr8p9zYZ7VaUffh3EmeJVRTLk0gzRiyM00cPmpbUlr"
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </BrowserRouter>
);


