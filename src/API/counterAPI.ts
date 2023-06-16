import axios from "axios";

const API_URL = "http://localhost:5000/api/counter/";
// const API_URL = "https://queue-ticketing-api.azurewebsites.net/api/counter/";

export const counterAPI = {

    getCounter: async () => {
        const response = await axios.get(`${API_URL}get`);
        return response.data;
    },

    toggleStatus: async (ind: number) => {
        const response = await axios.put(`${API_URL}toggle/${ind}`);
        return response.data;
    },

    completeCurrent: async (ind: number) => {
        const response = await axios.put(`${API_URL}complete/${ind}`);
        return response.data;
    },

    callNext: async (ind: number) => {
        const response = await axios.put(`${API_URL}call/${ind}`);
        return response.data;
    }
}

