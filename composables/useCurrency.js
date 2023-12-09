export const useCurrency = (amount) => {
  const currency = computed(() => {

    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN'
    }).format((isRef(amount) ? amount.value : amount) / 100);
  })

  return {
    currency
  }
}