<script setup>
const { products, loading: loadingProducts, fetchProducts } = useProductFetch();
const { price: fetchedPrice, fetchPrice } = usePriceFetch();

const productDetails = ref([]);

onMounted(async () => {
  await fetchProducts();

  const pricePromises = products.value.map(async (product) => {
    try {
      const priceInfo = await fetchPrice(product.default_price);
      return {
        ...product,
        priceFormatted: useCurrency(priceInfo).currency,
        priceInfo,
      };
    } catch (e) {
      console.log("Error fetching price for product:", product.id);
      return { ...product, priceInfo: null };
    }
  });

  productDetails.value = await Promise.all(pricePromises);
});
</script>
<template>
  <div v-if="loadingProducts">Ładowanie produktów...</div>
  <div v-if="error">{{ error.message }}</div>
  <ul v-else class="flex">
    <div
      v-for="product in productDetails"
      :key="product.id"
      class="w-96 mx-4 my-4"
    >
      <UCard>
        <template #header>
          {{ product.name }} - Cena:
          {{ product.priceFormatted }}
        </template>

        <img
          class="rounded h-3/4 object-cover"
          :src="product.images[0]"
          :alt="product.name"
        />

        <template #footer>{{ product.description }} </template>
      </UCard>
    </div>
  </ul>
</template>
