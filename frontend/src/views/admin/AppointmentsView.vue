<script setup>
    import AdminAppointment from '@/components/AdminAppointment.vue'
    import { useUserStore } from '@/stores/user'

    const user = useUserStore()
</script>

<template>
    <div class="max-w-screen-lg mx-auto p-4">
        <p class="text-primary text-lg">
            A continuación podrás revisar tus próximas citas
        </p>
        
        <p v-if="user.loading" class="text-primary text-xl text-center mt-5">
            Cargando...
        </p>

        <div v-else>
            <p v-if="user.noAppointments" class="text-primary text-xl text-center mt-5">
                No tienes próximas citas
            </p>

            <div v-else class="grid grid-cols-1 gap-5 mt-10">
                <AdminAppointment 
                    v-for="appointment in user.userAppointments"
                    :key="appointment._id"
                    :appointment="appointment"
                />
            </div>
        </div>
    </div>
</template>