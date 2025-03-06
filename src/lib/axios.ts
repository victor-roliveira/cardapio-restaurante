import axios from "axios";

export const api = axios.create({
    baseURL: "https://restaurante-api-wv3i.onrender.com",
});