import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

export const getTransactions = () =>
    API.get("/transactions");

export const addTransaction = (transaction: unknown) =>
    API.post("/transactions", transaction);

export const deleteTransaction = (id: string) => {
    console.log("API DELETE ID:", id);

    return API.delete(`/transactions/${id}`);
};

export const updateTransaction = (
    id: string,
    transaction: unknown
) =>
    API.put(`/transactions/${id}`, transaction);

