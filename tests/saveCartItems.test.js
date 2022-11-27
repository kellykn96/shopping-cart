const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

const itemAsListed = '<ol><li>Item</li></ol>';

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Should test if execute saveCartItems the method localStorage.setItem is called', () => {
    saveCartItems(itemAsListed);
    expect(localStorage.setItem).toBeCalled();
  });
  it('Shld test if  saveCartItems localStorage.setItem is called with cartItems', () => {
    saveCartItems(itemAsListed);
    expect(localStorage.setItem).toBeCalledWith('cartItems', itemAsListed);
  });
});
