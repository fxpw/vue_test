import axios from 'axios';

const API_BASE_URL = "http://localhost:5000/api";

// Создание экземпляра axios с предустановленным базовым URL
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Экспортируйте экземпляр axios для использования в других файлах
export default api;
