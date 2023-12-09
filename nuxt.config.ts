// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@nuxt/ui'],
  runtimeConfig: {
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    endpoint_secret: process.env.ENDPOINT_SECRET,
    public: {
      stripe_key: process.env.STRIPE_KEY,
    }
  },
  supabase: {
    redirect: false
  },
})