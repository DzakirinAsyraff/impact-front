import axios from "axios";
import { IProduct } from "../types/product";

const API_URL = "http://localhost:5000/api/product/";

export const productAPI = {

    getAllProducts: async () => {
        const response = await axios.get(`${API_URL}get`);
        return response.data;
    },

    addProduct : async (product: IProduct) => {
        const response = await axios.post(`${API_URL}add`, product);
        return response.data;
    },

    //get product by name
    getProductByName: async (name: string) => {
        const response = await axios.get(`${API_URL}get/${name}`);
        return response.data;
    },

}
    