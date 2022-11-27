const saveCartItems = require('./helpers/saveCartItems');
const fetchItem = require('./helpers/fetchItem');
const fetchProducts = require('./helpers/fetchProducts');
const getSavedCartItems = require('./helpers/getSavedCartItems');
// import getSavadeCartItem from './helpers/saveCartItems';

const cart = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image, price }) => {
  const section = document.createElement('section');
  const itemPrice = document.createElement('div');
  itemPrice.className = 'item__itemPrice';
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  itemPrice.appendChild(createCustomElement('span', 'item__currency', 'R$'));
  itemPrice.appendChild(createCustomElement('span', 'item__price', `${price.toFixed(2)}`));
  section.appendChild(itemPrice);
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho'));
  return section;
};

const calculateTotal = () => {
  const children = [...cart.children];
  return children.reduce((acc, item) => {
    const text = item.innerText;
    const priceIndex = text.indexOf('PRICE:');
    const price = text
      .slice(priceIndex, text.length)
      .replace('PRICE: $', '');
    return Number(price, 10) + acc;
  }, 0);
};

const refreshTotalPrice = () => {
  const totalPrice = document.querySelector('.total-price');
  totalPrice.innerText = `Subtotal: R$ ${calculateTotal().toFixed(2)}`; 
};

const cartItemClickListener = (event) => {
  cart.removeChild(event.target);
  saveCartItems(cart.innerHTML);
  refreshTotalPrice();
};

const createCartItemElement = ({ sku, name, salePrice, thumbnail }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice.toFixed(2)}`;
  li.appendChild(createProductImageElement(thumbnail));
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const putItemInCart = async (productId) => {
  const response = await fetchItem(productId);
  const { id, title, price, thumbnail } = response;
  const cartItem = createCartItemElement({ sku: id, name: title, salePrice: price, thumbnail });
  cartItem.addEventListener('click', cartItemClickListener);
  cart.appendChild(cartItem);
  saveCartItems(cart.innerHTML);
  refreshTotalPrice();
};

const createLoading = () => {
  const p = document.createElement('p');
  const itemsSection = document.querySelector('.items');
  p.innerText = 'carregando...';
  p.className = 'loading';
  itemsSection.appendChild(p);
};

const removeLoading = () => {
  const loading = document.querySelector('.loading');
  loading.parentElement.removeChild(loading);
};

const putProductItemElementOnScreen = async () => {
  const itemsSection = document.querySelector('.items');
  const response = await fetchProducts('computador');
  const { results: data } = response;
  data.forEach((item) => {
    const { id, title, thumbnail, price } = item;
    const productItem = createProductItemElement({ sku: id, name: title, image: thumbnail, price });
    itemsSection.appendChild(productItem);
    // productItem.lastChild is the item's button
    productItem.lastChild.addEventListener('click', () => { putItemInCart(id); });
  });
  removeLoading();
};

const loadCartWithSavedItems = () => {
  cart.innerHTML = getSavedCartItems();
  const children = [...cart.children];
  children.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

const createTotalPrice = () => {
  const cartSection = document.querySelector('.cart');
  const totalPrice = document.createElement('p');
  totalPrice.className = 'total-price';
  const div = cartSection.children[1];
  div.className = 'price_section';
  div.insertBefore(totalPrice, div.children[0]);
  refreshTotalPrice();
};

const emptyCar = () => {
  const emptyCartButton = document.querySelector('.empty-cart');
  emptyCartButton.addEventListener('click', () => {
    cart.innerHTML = '';
    localStorage.clear();
    refreshTotalPrice();
  });
};

window.onload = () => {
  createLoading();
  loadCartWithSavedItems();
  putProductItemElementOnScreen();
  createTotalPrice();
  emptyCar();
};
