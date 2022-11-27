require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste fetchItem', () => {
  it('Should test if fetchItem is a function', async () => {
    expect(typeof fetchItem).toBe('function');
  }); it('Should test if the fetch was called', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  }); it('Should test if the fetch was called with right endpoint', async () => {
    await fetchItem('MLB1615760527');
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toBeCalledWith(endpoint);
  }); it('Should test if the response is the expected response', async () => {
    const response = await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
  }); it('Should test if fetchItem is called w/ parameter returns the expected error', async () => {
    try {
      await fetchItem();
    } catch (error) { expect(error).toEqual(new Error('You must provide an url')); }
  });
});
