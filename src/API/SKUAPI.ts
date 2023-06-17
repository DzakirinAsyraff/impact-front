import axios from "axios";
import { ISKU } from "../types/sku";

const API_URL = "http://localhost:5000/api/sku/";

export const skuAPI = {

    getAllSKUs: async () => {
        const response = await axios.get(`${API_URL}get`);
        return response.data;
    },

    addSKU: async (sku: ISKU) => {
        const response = await axios.post(`${API_URL}add`, sku);
        return response.data;
    }

}

