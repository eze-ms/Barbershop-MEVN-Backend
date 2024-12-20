<script setup>
  import { formatCurrency } from '@/helpers'
  import { useAppointmentStore } from '@/stores/appointments'

  const appointments = useAppointmentStore()
  
  defineProps({
    service: {
      type: Object
    }
  })
</script>

<template>
  <div 
    class="p-5 space-y-5 rounded cursor-pointer flex flex-col justify-between h-full border border-gray-300 hover:bg-slate-200 transition-colors duration-200"
    :class="appointments.isServiceSelected(service._id) ? 'bg-slate-200 text-white' : 'bg-white'"
    @click="appointments.onServiceSelected(service)"  
    >
    <p class="font-roboto text-2xl font-bold text-primary">{{ service.name }}</p>
    <p class="text-md font-light text-gray-600">{{ service.description }}</p>
    <p 
      class="font-roboto text-xl font-light mt-auto text-primary">{{ formatCurrency(service.price) }}
    </p>
  </div>
</template>