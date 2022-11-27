require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Should test if fetchProducts is a function', async () => {
    expect(typeof fetchProducts).toBe('function');
  }); it('Should test if the fetch was called', async () => {
    await fetchProducts('computador');
    expect(fetch).toBeCalled();
  }); it('Should test if the fetch was called with right endpoint', async () => {
    await fetchProducts('computador');
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toBeCalledWith(endpoint);
  }); it('Should test if the response is the expected response', async () => {
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  }); 
  it('Should test if fetchProducts is called wo parameter returns the expected error', async () => {
    try {
      await fetchProducts();
    } catch (error) { expect(error).toEqual(new Error('You must provide an url')); }
  });
});
