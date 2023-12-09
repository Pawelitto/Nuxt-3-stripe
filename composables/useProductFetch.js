export const useProductFetch = () => {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchProducts = async () => {
    loading.value = true;
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Error fetching products');
      const data = await response.json();
      products.value = data.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  return { products, loading, error, fetchProducts };
};
