import sendRequest from "./send-request";
// This is the base path of the Express route:
const BASE_URL = '/api/orders';

// Retrieve the cart (i.e. the unpaid order) for the current user:
export function getCart() {
  return sendRequest(`${BASE_URL}/cart`);
}

// Add an item to the cart:
export function addItemToCart(itemId, size, quantity) {
  return sendRequest(`${BASE_URL}/cart/items`, 'POST', { itemId, size, quantity });
}

// Set item quantity in the cart:
export function setItemQuantity(itemId, size, quantity) {
  return sendRequest(`${BASE_URL}/cart/quantity`, 'PUT', { itemId, size, quantity });
}

// Checkout the cart (i.e. update the unpaid order's isPaid property to true):
export function checkout(address) {
  return sendRequest(`${BASE_URL}/cart/checkout`, 'POST', { address });
}

// Retrieve all orders for the logged in user:
export function getAll() {
  return sendRequest(BASE_URL);
}

// Retrieve a specific order for the logged in user:
export function getOne(orderId) {
  return sendRequest(`${BASE_URL}/${orderId}`);
}