// import express from 'express';
// import stripe from 'stripe';

// const router = express.Router();
// const stripeSecretKey = "sk_test_51Nx7PFKc2Tj9alNLODluXzljd0Xkbk2FK3ZrFznwJUlOfAMJ5wGvftXYug2uoIoxc2iG1pBDRbrbgF4y1PKncToU00yPZ2T5Gg";

// const stripeInstance = stripe(stripeSecretKey);

// export default defineEventHandler(async (event) => {
//   const body = await readBody(event)
//   let res;

//   try {
//     const session = await stripeInstance.checkout.sessions.create({
//       payment_method_types: ['card', 'p24', 'blik'],
//       line_items: [
//         {
//           price_data: {
//             currency: body.currency,
//             product_data: {
//               name: 'Kurs kodowania', // Nazwa Twojego produktu
//             },
//             unit_amount: 70000, // Cena produktu w centach (np. 10 PLN = 1000 centów)
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: 'https://localhost:3000/success',
//       cancel_url: 'https://localhost:3000/cancel',
//     });

//     res.json({ id: session.id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Błąd tworzenia sesji płatności' });
//   }

//   return res
// });

import express from 'express';
import stripe from 'stripe';
import { defineEventHandler, readBody } from 'h3';

const router = express.Router();
const stripeSecretKey = "sk_test_51Nx7PFKc2Tj9alNLODluXzljd0Xkbk2FK3ZrFznwJUlOfAMJ5wGvftXYug2uoIoxc2iG1pBDRbrbgF4y1PKncToU00yPZ2T5Gg";

const stripeInstance = stripe(stripeSecretKey);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card', 'p24', 'blik'],
      line_items: [
        {
          price_data: {
            currency: body.currency,
            product_data: {
              name: 'Kurs kodowania', // Nazwa Twojego produktu
            },
            unit_amount: 70000, // Cena produktu w centach (np. 10 PLN = 1000 centów)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://localhost:3000/success',
      cancel_url: 'https://localhost:3000/cancel',
    });

    return {
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Błąd tworzenia sesji płatności' }),
    };
  }
});
