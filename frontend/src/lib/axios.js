import axios from "axios";


// Creating an instance (Template so we dont have to keep )
const api = axios.create({
  baseURL: "http://localhost:5001/api"
})

export default api;