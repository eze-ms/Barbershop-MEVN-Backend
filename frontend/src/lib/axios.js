import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL // Define la URL base para todas las solicitudes de esta instancia
})

// Agrega un interceptor de solicitudes (request interceptor) a la instancia de Axios
// Este interceptor se ejecuta antes de cada solicitud
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('AUTH_TOKEN')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


export default api
