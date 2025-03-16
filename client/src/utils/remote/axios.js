import axios from "axios";

axios.defaults.baseURL = "http://localhost/gallery/server/apis/v1"; 
axios.defaults.headers = {
"Content-Type": "application/json",
};

export const request = async ({ method, route, body }) => {
    try {
    const response = await axios.request({
        method, 
        url: route,
        data: body,
    });

    return response.data;
} catch (error) {
    return {
        error: true,
        message: error.message,
    };
}
};