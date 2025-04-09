import sendRequest from "./send-request";
// This is the base path of the Express route:
const BASE_URL = '/api/orders';

// Retrieve the cart (i.e. the unpaid order) for the current user:
export async function getCart() {
  return sendRequest(`${BASE_URL}/cart`);
}

// Add an item to the cart:
export async function addItemToCart(itemId, size, quantity) {
  return sendRequest(`${BASE_URL}/cart/items`, 'POST', { itemId, size, quantity });
}