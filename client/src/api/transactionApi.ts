import API from "./api"


API.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


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

