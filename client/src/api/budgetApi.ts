import API from "./api";

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;

    }

    return config;
});

export const getBudgets = () => API.get("/budgets");

export const addBudget = (budget: unknown) => API.post("/budgets", budget);

export const deleteBudget = (id: string) => API.delete(`/budgets/${id}`);