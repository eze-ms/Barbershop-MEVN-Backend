<script setup>
    import Appointment from '@/components/Appointment.vue' 
    import { useUserStore } from '@/stores/user'
    const user = useUserStore()
</script>

<template>
    <div class="max-w-screen-lg mx-auto p-4">
        <h2 class="text-primary font-roboto text-3xl font-bold py-8">Mis Citas</h2>

        <p v-if="user.loading" class="text-primary text-xl text-center mt-5">Cargando...</p>

        <div v-else>
            <p v-if="user.noAppointments" class="text-primary text-xl text-center mt-5">No tienes citas próximamente</p>
            <div v-else class="grid grid-cols-1 gap-5 mt-10">
                <Appointment
                    v-for="appointment in user.userAppointments"
                    :key="appointment._id"
                    :appointment="appointment"
                />
            </div>
        </div>
    </div>
</template>