<script setup>
    import { displayDate } from '../helpers/date'
    import { formatCurrency } from '../helpers';

    defineProps({
        appointment: {
            type: Object
        }
    })
    
</script>

<template>
    <div 
        class="text-primary space-y-3 font-roboto border border-gray-300 rounded p-4 mb-4"
    >
        <p class="font-black">
            Fecha: <span class="font-light"> {{ displayDate( appointment.date ) }} </span>
        </p>

        <p class="font-black">
            Hora: <span class="font-light"> {{ appointment.time }} Horas.</span>
        </p>

        <p class="font-black">
            Nombre del cliente: <span class="font-light"> {{ appointment.user.name }} </span>   
        </p>

        <p class="font-black">
            Email: <span class="font-light"> {{ appointment.user.email }} </span>
        </p>

        <p class="text-lg font-black">Servicios solicitados en la cita:</p>
        <div v-for="service in appointment.services">
            <p>{{ service.name }}</p>
            <p class="text-2xl font-black">{{ formatCurrency( service.price ) }}</p>
        </div>

        <p class="text-xl font-medium text-right">
            Total a pagar: <span class="text-primary text-2xl font-bold"> {{ formatCurrency( appointment.totalAmount ) }} </span>
        </p>
    </div>
</template>