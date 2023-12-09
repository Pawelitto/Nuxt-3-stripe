<script setup lang="ts">
import type { Stripe, StripeElements } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// useRedirectIfAuth("/login");

const router = useRouter();
const config = useRuntimeConfig();

let stripe: Stripe | null;
let loading = ref(true);
let elements: StripeElements;

onMounted(async () => {
  stripe = await loadStripe(config.public.STRIPE_KEY);

  elements = stripe!.elements({
    mode: "payment",
    amount: 7000,
    currency: "pln",
  });

  const paymentElement = elements.create("payment");
  paymentElement.mount("#payment-element");

  loading.value = false;
});

const handleSubmit = async (e: Event) => {
  if (loading.value) return;
  if (!stripe || !elements) {
    // Stripe.js hasn't yet loaded.
    return;
  }
  loading.value = true;
  const { name, email, address, city, state, zip } = Object.fromEntries(
    new FormData(e.target as HTMLFormElement)
  );

  try {
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productID: "prod_P6ID6VV3FClA1Q" }),
    });

    const { secret: clientSecret } = await response.json();

    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.log("error submit");
      loading.value = false;
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        receipt_email: email as string,
        shipping: {
          address: {
            city: city as string,
            line1: address as string,
            state: state as string,
            postal_code: zip as string,
            country: "PL",
          },
          name: name as string,
        },
        return_url: "http://localhost:3000/success",
      },
      // Uncomment below if you only want redirect for redirect-based payments
      // redirect: "if_required",
    });

    loading.value = false;
    if (error.type === "card_error" || error.type === "validation_error") {
      router.push("/error");
    } else {
      console.log("great");
    }
  } catch (error) {
    console.log("error", error);
    router.push("/error");
    loading.value = false;
  }
};
</script>
<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <fieldset :class="{ dis: loading }">
        <div>
          <label for="name_field">Name</label>
          <input
            placeholder="Jane Doe"
            type="text"
            name="name"
            id="name_field"
          />
        </div>
        <div>
          <label for="email_field">Email</label>
          <input
            placeholder="jane.doe@example.com "
            type="email"
            name="email"
            id="email_field"
          />
        </div>
        <div>
          <label for="address_field">Address</label>
          <input
            placeholder="1234 Sycamore Street"
            type="text"
            name="address"
            id="address_field"
          />
        </div>
        <div>
          <label for="city_field">City</label>
          <input placeholder="Reno" type="text" name="city" id="city_field" />
        </div>
        <div>
          <label for="state_field">State</label>
          <input
            placeholder="Nevada"
            type="text"
            name="state"
            id="state_field"
          />
        </div>
        <div>
          <label for="zip_field">Zip</label>
          <input placeholder="89523" type="text" name="zip" id="zip_field" />
        </div>
        <div>
          <label for="email_field">Credit Card</label>
          <div id="payment-element" />
        </div>
      </fieldset>
      <div>
        <button type="submit" :class="{ dis: loading }">
          {{ loading ? "Loading..." : "Zapłać 70.00 PLN" }}
        </button>
      </div>
    </form>
  </div>
</template>
