import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const stripe = new Stripe(config.stripe_secret_key, {
    apiVersion: '2023-10-16'
  });

  const priceId = event.context.params.priceId;

  try {
    const price = await stripe.prices.retrieve(priceId);

    return { data: price };
  } catch (error) {
    return createError({ statusCode: 500, message: error.message });
  }
});
