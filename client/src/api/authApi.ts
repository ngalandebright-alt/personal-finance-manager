import API from "./api";


export const register = (user: {
    name: string;
    email: string;
    password: string;
}) => {
    return API.post("/auth/register", user);
};


export const login = (user: {
    email: string;
    password: string;
}) => {
    return API.post("/auth/login", user);
};


export const updateProfile = (user: {
    name: string;
    email: string;
}) => {
    return API.put("/auth/profile", user);
};