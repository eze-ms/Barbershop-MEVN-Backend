<script setup>
    import { onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { useAppointmentStore } from '@/stores/appointments'

    const route = useRoute()
    const appointments = useAppointmentStore()

    onMounted(() => {
        appointments.clearAppointmentData()
    })
</script>

<template>
    <nav class="my-5 flex gap-3 max-w-screen-lg mx-auto justify-center border-b border-gray-400 pb-8">
        <RouterLink
            :to="{name:'new-appointment'}"
            class="flex text-center font-roboto p-3 border-b-2 border-gray-200 uppercase font-bold transition-colors duration-200"
            :class="route.name === 'new-appointment' ? 'border-primary text-primary' : 'bg-white text-gray-400 font-medium'"
        >
             Servicios
        </RouterLink>

        <RouterLink
            :to="{name:'appointment-details'}"
            class="flex text-center p-3 font-roboto border-b-2 border-gray-200 uppercase font-bold  transition-colors duration-200"
            :class="route.name === 'appointment-details' ? 'border-primary text-primary' : 'bg-white text-gray-400 font-medium'"
        >
             Cita y Resumen
        </RouterLink>
    </nav>
    <div class="space-y-5">
        <RouterView />
    </div>
</template>