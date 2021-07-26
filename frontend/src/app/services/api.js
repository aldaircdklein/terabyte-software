import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
})
const api2 = axios.create({
    baseURL: 'http://localhost:3334'
})

export {
    api,
    api2
};