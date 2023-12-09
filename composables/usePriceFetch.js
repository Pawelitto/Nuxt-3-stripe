export const usePriceFetch = () => {
  const price = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchPrice = async (priceId) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`/api/price/${priceId}`);
      if (!response.ok) throw new Error('Error fetching price');
      const data = await response.json();
      price.value = data.data.unit_amount;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
      return price.value
    }
  };

  return { price, loading, error, fetchPrice };
};
