import axios from "axios";
import { ISales } from "../types/sales";

const API_URL = "http://localhost:5000/api/sales/";

export const salesAPI = {

    getAllSales: async () => {
        const response = await axios.get(`${API_URL}get`);
        return response.data;
    },

    getStock: async (id: string) => {
        const response = await axios.get(`${API_URL}get/${id}`);
        return response.data;
    }
}