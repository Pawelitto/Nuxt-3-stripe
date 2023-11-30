<template>
  <div>
    <!-- Formularz płatności -->
    <button @click="handlePayment">Zapłać za produkt</button>
  </div>
</template>

<script setup>
import { Stripe } from 'stripe';

const handlePayment = async () => {
  // Inicjalizacja Stripe


  const stripe = new Stripe('pk_test_51Nx7PFKc2Tj9alNLzsj4VBCT3ipyxHWFUZpZ0ClnL2sXY4HsLSXniXpymuMeW6sp1LbJ1mqcxYQhr3mDdBDEynY700q9VDS0cf');

  // Utworzenie sesji płatności
  const response = await fetch('/api/payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ product: 'prod_P6ID6VV3FClA1Q', currency: 'pln' }),
  });

  const session = await response.json();
  console.log(JSON.parse(session.body).id)

  // Rozpoczęcie płatności
  stripe.redirectToCheckout({
    sessionId: JSON.parse(session.body).id,
  });

  // if (error) {
  //   console.error(error);
  // }
};
</script>
