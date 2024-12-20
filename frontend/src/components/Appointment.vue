<script setup>
    import { displayDate } from '@/helpers/date'
    import { formatCurrency } from '@/helpers'
    import { useAppointmentStore } from '@/stores/appointments'

    const appointments = useAppointmentStore()

    defineProps({
        appointment: {
            type: Object
        }
    })
</script>

<template>
    <div class="text-primary space-y-3 font-roboto border border-gray-300 rounded p-4 mb-4">
        <p class="font-black">
            Fecha: <span class="font-light"> {{ displayDate( appointment.date ) }} </span>
            Hora: <span class="font-light"> {{ appointment.time }}H</span>
        </p>

        <p class="text-lg font-bold">Servicio solicitado:</p>
        <div v-for="service in appointment.services">
            <p>{{ service.name }}</p>
            <p class="text-2xl font-bold">{{ formatCurrency( service.price ) }}</p>
        </div>

        <p class="text-2xl font-black text-center md:text-right">
            Total a pagar: <span class="text-primary">{{ formatCurrency( appointment.totalAmount ) }}</span>
        </p>


        <div class="flex gap-2 items-center justify-center sm:justify-start">
            <RouterLink
                :to="{name: 'edit-appointment', params: { id : appointment._id } }"
                class="inline-flex items-center rounded-md bg-slate-500 text-white text-sm px-3 py-2 font-semibold shadow-sm hover:bg-slate-600 transition-colors duration-200"
            >
                Editar Cita
            </RouterLink>

            <button
                class="inline-flex items-center rounded-md bg-primary text-white text-sm px-3 py-2 font-semibold shadow-sm hover:bg-slate-500 transition-colors duration-200"
                @click="appointments.cancelAppointment(appointment._id)"
            >
                Cancelar Cita
            </button>
        </div>
    </div>
</template>