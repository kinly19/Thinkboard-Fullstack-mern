import axios from "axios";

/*
  Notes
  - import.meta.env.MODE
    is a Vite-specific way to check your app’s environment
    "development" - when running locally with vite dev.
    "production" - when the app is built and deployed.
*/

// Dynamically set the base URL depending on the environment:
// - In development, use the local backend server (http://localhost:5001/api)
// - In production, use a relative path (/api) since the frontend and backend share the same domain
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

// creates a custom Axios instance, preconfigured with the correct baseURL
const api = axios.create({
  baseURL: BASE_URL
})

// Creating a dynamic url


export default api;