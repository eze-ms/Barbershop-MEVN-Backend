<script setup>
    import { useAppointmentStore } from '@/stores/appointments'
    import { formatCurrency } from '@/helpers'

    const appointments = useAppointmentStore()
    defineProps({
        service: {
            type: Object
        }
    })
</script>

<template>
    <div class="border border-gray-300 rounded p-4 flex justify-between items-center">
        <div class="w-2/4 space-y-2">
            <p class="font-roboto text-2xl font-bold text-primary">{{ service.name }}</p>
            <p class="text-md font-light text-gray-600">{{ service.description }}</p>
            <p class="font-roboto text-xl font-light mt-auto text-primary">{{ formatCurrency (service.price) }}</p>
        </div>

        <button
            type="button"
            class="inline-flex items-center rounded-md bg-slate-400 text-white text-sm px-3 py-2 font-semibold shadow-sm hover:bg-primary transition-colors duration-200"
            @click="appointments.onServiceSelected(service)"
        >
            Eliminar
        </button>
    </div>
</template>