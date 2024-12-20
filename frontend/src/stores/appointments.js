import { ref, computed, onMounted, inject, watch } from "vue"
import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import AppointmentAPI from "@/api/AppointmentAPI"
import { convertToISO, convertToDDMMYYYY } from "@/helpers/date"
import { useUserStore } from "./user"

// Definición del store 'appointments'
export const useAppointmentStore = defineStore('appointments', () => {
 
  // Almacena los servicios, fecha y horas
  const appointmentId = ref('')
  const services = ref([])
  const date = ref('')
  const time = ref('')
  const appointmentsByDate = ref([])
  const hours = ref([])

  const toast = inject('toast')
  const router = useRouter()
  const user = useUserStore()

  onMounted(() =>{
    const startHours = 10
    const endHours = 20
    for (let hour = startHours; hour <= endHours; hour++) {
      hours.value.push( hour + ':00' )  
    }
  })

  watch(date, async () => {
    time.value = ''; // Resetear el valor de 'time'
    if (date.value === '') return; // Si no hay fecha seleccionada, no hacemos nada
  
    // Obtenemos las citas
    const { data } = await AppointmentAPI.getByDate(date.value);

    if (appointmentId.value) {
      // Filtramos las citas, asegurándonos de que 'appointment' tiene 'time' antes de asignarlo
      appointmentsByDate.value = data.filter(appointment => appointment._id !== appointmentId.value);
  
      // Buscar el appointment por ID y validar si tiene la propiedad 'time'
      const selectedAppointment = data.find(appointment => appointment._id === appointmentId.value);
      if (selectedAppointment && selectedAppointment.time) {
        time.value = selectedAppointment.time; // Asignar 'time' si está disponible
      } else {
        console.warn("No se encontró la propiedad 'time' para esta cita", selectedAppointment); // Mejorar el log
      }
    } else {
      appointmentsByDate.value = data; // Si no hay 'appointmentId', simplemente asignamos las citas
    }
  })
  
  //! Función para mostrar la cita seleccionada por el usuario
  function setSelectedAppointment(appointment) {
    services.value = [...appointment.services]
    date.value = convertToDDMMYYYY(appointment.date)
    time.value = appointment.time
    appointmentId.value = appointment._id
  }

  //! Función para manejar la selección de servicios
  function onServiceSelected(service) {
    // Verifica si el servicio ya está en la lista
    if (services.value.some(selectedService => selectedService._id === service._id)) {
      services.value = services.value.filter(selectedService => selectedService._id !== service._id) // Si está seleccionado, lo elimina
      
    } else {
      // Límite de selección: máximo 3 servicios
      if(services.value.length === 3) {
        alert('Máximo 3 servicios por cita')
        return
      }
      services.value.push(service)
    }
  }

//! Función para confirmar reserva
async function saveAppointment() {
  const appointment = {
      services: services.value.map(service => service._id),
      date: convertToISO(date.value),
      time: time.value,
      totalAmount: totalAmount.value
  }

  if (appointmentId.value) {
      try {
          const { data } = await AppointmentAPI.update(appointmentId.value, appointment);
          toast.open({
              message: data.msg,
              type: 'success'
          });
      } catch (error) {
          console.log(error);
      }
  } else {
      try {
          const { data } = await AppointmentAPI.create(appointment);
          toast.open({
              message: data.msg,
              type: 'success'
          });
      } catch (error) {
          console.log(error);
      }
  }

  clearAppointmentData();
  user.getUserAppointments();

  router.push({ name: 'my-appointments' });
}
  //! Función para reiniciar las reservas
  function clearAppointmentData() {
    appointmentId.value = ''
    services.value = []
    date.value = ''
    time.value = ''
  }
  
  //! Función para cancelar las reservas
  async function cancelAppointment(id) {
    if (confirm('¿Deseas cancelar la cita?')) {
      try {
        const { data } = await AppointmentAPI.delete(id);
        toast.open({
          message: data.msg,
          type: 'success',
        })

        user.userAppointments = user.userAppointments.filter(appointment => appointment._id !== id)
      } catch (error) {
        toast.open({
          message: error.response?.data?.msg || 'Error al cancelar la cita.',
          type: 'error',
        })
      }
    }
  }
  
  //! Propiedad computada para verificar si un servicio está seleccionado
  const isServiceSelected = computed(() => {
    return (id) => services.value.some( service => service._id === id )
  })

  //! Propiedad computada para revisar si el usuario tiene servicios seleccionados
  const noServicesSelected = computed(() => services.value.length === 0)

  //! Propiedad computada para calcular el costo total de los servicios seleccionados
  const totalAmount = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0)
  })

  //! Propiedad computada para mostrar confirmación de cita
  const isValidReservation = computed(() => {
    return services.value.length && date.value.length && time.value.length
  })

  //! Propiedad computada para desabilitar las fechas ocupadas
  const isDateSelected = computed(() => {
    return date.value ? true : false
  })

  //! Propiedad computada para desabilitar las horas ocupadas
  const disabledTime = computed(() => {
    return (hour) => {
      return appointmentsByDate.value.find(appointment => appointment.time === hour)
    }
  })

  return { 
    services,
    date,
    hours,
    time,
    onServiceSelected,
    setSelectedAppointment,
    saveAppointment,
    clearAppointmentData,
    cancelAppointment,
    isServiceSelected,
    noServicesSelected,
    totalAmount,
    isValidReservation,
    isDateSelected,
    disabledTime
  }
})
