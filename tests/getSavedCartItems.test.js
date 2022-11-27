const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Should test if execute getSavedCartItems the method localStorage.setItem is called', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalled();
  });
  it('Sld test if getSavedCartItems method localStorage.setItem is called w cartItems', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalledWith('cartItems');
  });
});
