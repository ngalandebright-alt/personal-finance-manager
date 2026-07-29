import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",

});

export const getTransactions = () =>
    API.get("/transactions");

export const addTransaction = (transaction: unknown) =>
    API.post("/transactions", transaction);

export const deleteTransaction = (id: number) =>
    API.delete(`/transactions/${id}`);

export const updateTransaction = (
    id: number,
    transaction: unknown
) => 
    API.put(`/transactions/${id}`, transaction);

