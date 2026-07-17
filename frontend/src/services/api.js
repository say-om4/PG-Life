import axios from "axios";

const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const API = axios.create({
  baseURL: isLocal ? "http://localhost/PG-Life/backend/api" : "https://saypglife.free.nf/backend/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;