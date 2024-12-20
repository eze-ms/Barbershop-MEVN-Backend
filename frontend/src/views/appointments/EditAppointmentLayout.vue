<script setup>
    import { onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import AppointmentAPI from '@/api/AppointmentAPI'
    import { useAppointmentStore } from '@/stores/appointments'

    const appointments = useAppointmentStore()
    const route = useRoute()
    const router = useRouter()
        
    const { id } = route.params

    onMounted(async () => {
        try {
            const { data } = await AppointmentAPI.getById(id)
            appointments.setSelectedAppointment(data)
        } catch (error) {
            router.push({name: 'my-appointments'})
        }
    })
</script>

<template>
    <nav class="my-5 flex gap-3 max-w-screen-lg mx-auto justify-center border-b border-gray-400 pb-8">
        <RouterLink
            :to="{name:'edit-appointment'}"
            class="flex text-center font-roboto p-3 border-b-2 border-gray-200 uppercase font-bold transition-colors duration-200"
            :class="route.name === 'edit-appointment' ? 'border-primary text-primary' : 'bg-white text-gray-400 font-medium'"
        >
             Servicios
        </RouterLink>

        <RouterLink
            :to="{name:'edit-appointment-details'}"
            class="flex text-center p-3 font-roboto border-b-2 border-gray-200 uppercase font-bold  transition-colors duration-200"
            :class="route.name === 'edit-appointment-details' ? 'border-primary text-primary' : 'bg-white text-gray-400 font-medium'"
        >
             Cita y Resumen
        </RouterLink>
    </nav>
    <div class="space-y-5">
        <RouterView />
    </div>
</template>