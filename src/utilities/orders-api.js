import sendRequest from "./send-request";
// This is the base path of the Express route:
const BASE_URL = '/api/orders';

// Retrieve the cart (i.e. the unpaid order) for the current user:
export async function getCart() {
  return sendRequest(`${BASE_URL}/cart`);
}
