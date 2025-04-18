import { getToken } from "./users-service";

export default async function sendRequest(url, method='GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc.
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  // Add the token to the headers if there is one:
  const token = getToken();
  if (token) {
    // Ensure the headers option exists:
    options.headers = options.headers || {};
    // Add the token to an Authorization header,
    // Prefacing it with 'Bearer' is recommended in the HTTP spec.
    options.headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, options);
  // res.ok will be false if the status code is set to 4xx in the controller action:
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}