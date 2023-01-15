import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://localhost:8081',
    baseURL: 'https://gugol-recados-api.vercel.app',
    headers: {
        "Content-type": "application/json"
    },
})

export { api }