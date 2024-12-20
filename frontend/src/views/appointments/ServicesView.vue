<script setup>
  import ServiceItem from '@/components/ServiceItem.vue'
  import { useServicesStore } from '@/stores/services'
  const store = useServicesStore()

</script>

<template>
 <div class="max-w-screen-lg mx-auto p-4">
  <p class="text-primary font-roboto text-3xl font-bold py-8">Selecciona un servicio</p>

  <!-- Grid responsivo -->
  <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 mt-5">
    <ServiceItem
      v-for="service in store.services"
      :key="service._id"
      :service="service"
    />
  </div>
</div>

</template>