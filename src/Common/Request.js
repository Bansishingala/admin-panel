import { axios } from "axios";
import { BASED_URL } from "../fetch/Base_url";



const instance = axios.create({
    baseURL: BASED_URL,
    timeout: 2000
});

export const sendRequest = (config) => {
    return instance.request(config)
}

export const getReqest = (path) => {
    return sendRequest({
        method: 'GET',
        url: path
    })
}

// export const 