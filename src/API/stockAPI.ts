import axios from "axios";
import { IStock } from "../types/stock";

const API_URL = "http://localhost:5000/api/stock/";

export const stockAPI = {

    getAllStocks: async () => {
        const response = await axios.get(`${API_URL}get`);
        return response.data;
    },

    getStock: async (id: string) => {
        const response = await axios.get(`${API_URL}get/${id}`);
        return response.data;
    }
}