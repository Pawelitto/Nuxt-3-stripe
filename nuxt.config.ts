// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    ENDPOINT_SECRET: process.env.ENDPOINT_SECRET,
    public: {
      STRIPE_KEY: process.env.STRIPE_KEY,
    }
  },
})