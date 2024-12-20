<script setup>
  import { ref } from 'vue'
  import VueTailwindDatepicker from 'vue-tailwind-datepicker'
  import SelectedService from '@/components/SelectedService.vue'
  import { formatCurrency } from '@/helpers';
  import { useAppointmentStore } from '@/stores/appointments'

  const appointments = useAppointmentStore()

  const formatter = ref({
    date: 'DD/MM/YYYY',
    month: 'MMM'
  })  

  // Desabilita fechas anteriores al dia corriente, mes siguiente y domingos
  const disableDate = (date) => {
    const today = new Date()
    return date < today || date.getMonth() > today.getMonth() + 1 || [0,7].includes( date.getDay() )
  }
</script>

<template>
    <div class="max-w-screen-lg mx-auto">
      <p v-if="appointments.noServicesSelected" class="text-primary font-bold text-2xl text-center">No hay servicios seleccionados</p>
      <div v-else class="font-roboto flex justify-between items-center border border-gray-300 rounded p-4 mb-4">
        <div>
          <h2 class="text-4xl font-extrabold text-primary">Detalles Cita y Resumen</h2>
          <p class="text-primary text-lg">A continuación verifica la información y confirma tu cita</p>
        </div>
        <p class="text-right text-primary text-2xl font-bold">Total a pagar:
            <span>{{ formatCurrency(appointments.totalAmount) }}</span>
        </p>
      </div>
      
      <div  class="grid gap-5">
        <SelectedService 
          v-for="service in appointments.services"
          :key="service._id"
          :service="service"
        />
      </div>

      <!-- Calendario y horas -->
      <div class="space-y-8 mt-10" v-if="!appointments.noServicesSelected">
        <h3 class="text-3xl font-bold text-primary font-roboto">Fecha y hora</h3>
        <div class="lg:flex gap-5 items-start">
          <!-- Calendario -->
          <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
            <VueTailwindDatepicker
              :disable-date="disableDate"
              i18n="es"
              as-single
              no-input
              :formatter="formatter"
              v-model="appointments.date "
            />
          </div>
          <!-- Horas -->
          <div v-if="appointments.isDateSelected" class="flex-1 grid justify-items-center grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 gap-4 mt-10 lg:mt-0">
            <button
              v-for="hour in appointments.hours"
              class="w-full p-3 rounded uppercase font-bold text-primary border border-gray-300 hover:bg-slate-200 transition-colors duration-100 disabled:opacity-15"
              :class="appointments.time === hour ? 'bg-slate-200' : ''"
              @click="appointments.time = hour"
              :disabled="appointments.disabledTime(hour) ? true : false"
            >
              {{ hour }}
            </button>
          </div>
        </div>
      </div>

      <!-- Confirmar reserva -->
      <div v-if="appointments.isValidReservation" class="flex justify-end">
        <button
            class="w-full md:w-auto bg-slate-200 p-3 rounded uppercase font-bold text-primary font-roboto hover:bg-primary hover:text-white transition-colors duration-200"
            @click="appointments.saveAppointment"
            >
          Confirmar Cita
        </button>
      </div>
    </div>
</template>