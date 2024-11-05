/* eslint-disable */
import Stripe from 'stripe';
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_51QFyXuRo7rwgT9eQTRvkBfidilLUJOtPx8xrC5rrTMcdHh34EnBQ4IDqe3qHtkItQ3p8r9MJtMcHYulH9V8w0XGP00nNRhwwJ6');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
