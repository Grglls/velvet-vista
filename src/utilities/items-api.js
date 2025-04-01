import sendRequest from "./send-request";
// This is the base path of the Express route:
const BASE_URL = '/api/items';

export async function getAll() {
  return sendRequest(BASE_URL);
}
