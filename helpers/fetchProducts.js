const fetchProducts = async (keyword) => {
  if (!keyword) {
    throw new Error('You must provide an url');
  }
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${keyword}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
