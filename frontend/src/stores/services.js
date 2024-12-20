import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import ServicesAPI from "@/api/ServicesAPI";

export const useServicesStore = defineStore('services', () => {
  const services = ref([]);

  // Método para cargar los servicios manualmente
  const fetchServices = async () => {
    if (services.value.length > 0) return; // Evita recargar si ya están cargados
    try {
      const { data } = await ServicesAPI.all();
      services.value = data;
    } catch (error) {
      console.error('Error al obtener los servicios:', error);
    }
  };

  // Carga automática al usar el store
  onMounted(fetchServices);

  return {
    services,
    fetchServices, // Exponemos el método para cargas explícitas
  };
});
