import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const stripe = new Stripe(config.stripe_secret_key, {
    apiVersion: '2023-10-16'
  });

  try {
    const response = await stripe.products.list({
      limit: 10, // Możesz dostosować limit produktów
      active: true
    });

    return { data: response.data };
  } catch (error) {
    return createError({ statusCode: 500, message: error.message });
  }
});
