import { ref, onMounted, computed } from "vue"
import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import AuthAPI from "@/api/AuthAPI"
import AppointmentAPI from "@/api/AppointmentAPI"

// Definimos el store 'user'
export const useUserStore = defineStore('user', () => {

  const router = useRouter() // Router para navegar entre rutas
  const user = ref({}) // Estado reactivo del usuario
  const userAppointments = ref([]) // Estado reactivo para almacenar las citas del usuario
  const loading = ref(true)

  // Función ejecutada cuando el componente se monta
  onMounted(async () => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if (!token) {
      loading.value = false // Finaliza el estado de carga si no hay token
      return
    }
    try {
      const { data } = await AuthAPI.auth()
      user.value = data
      await getUserAppointments()
    } catch (error) {
      console.log('Error autenticando usuario:', error)
    } finally {
      loading.value = false
    }
  })

  function setUser(data) {
    user.value = data; // Actualiza el estado del usuario
  }
  

   // Función para obtener las citas del usuario autenticado
  async function getUserAppointments() {
    try {
      const { data } = await AppointmentAPI.getUserAppointments(user.value._id)
      userAppointments.value = data // Guardamos las citas en el estado
    } catch (error) {
      console.error('Error obteniendo citas del usuario:', error)
    }
  }
  
  // Función para cerrar sesión
  function logout() {
    try {
      localStorage.removeItem('AUTH_TOKEN')
      user.value = {}
      router.push({ name: 'login' })
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }
  

  // Computed para obtener el nombre del usuario (si no existe, retorna una cadena vacía)
  const getUserName = computed(() => user.value?.name || '')

  // Computed para verificar si el usuario no tiene citas (devuelve true si el arreglo está vacío)
  const noAppointments = computed(() => userAppointments.value.length === 0) // No hay citas

  return {
    user,
    userAppointments,
    setUser,
    getUserAppointments,
    loading,
    logout,
    getUserName,
    noAppointments
  }
})