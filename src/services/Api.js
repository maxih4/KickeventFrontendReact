import axios from "axios";



const instance = axios.create({
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
});

instance.interceptors.request.use(
    (config) => {

        return config;

    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        return Promise.reject(err);
    }
);

export default instance;