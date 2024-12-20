<script setup>
  import { useServicesStore } from "@/stores/services"; // Importa el store de servicios
  import { onMounted } from "vue";

  const servicesStore = useServicesStore();

  // Carga los servicios al montar la página
  onMounted(() => {
    servicesStore.fetchServices();
  });
</script>

<template>
  <main>
    <div class="p-5 font-roboto text-center text-primary mx-auto lg:w-3/5 mt-20">
      <h1 class="text-3xl mb-10">Nosotros</h1>
      <p>
        Desde 2015, Barbershop ha sido el destino de referencia para el cuidado personal y la barbería masculina, 
        ofreciendo un espacio moderno y acogedor en el corazón de Gràcia, uno de los barrios más emblemáticos de Barcelona.
      </p>
      <p class="mt-3">
        Nuestro equipo de barberos expertos ofrece cortes de cabello personalizados, arreglos de barba y afeitados clásicos con navaja de filo siete días a la semana, 
        asegurando que cada cliente se vaya luciendo y sintiéndose de la mejor manera. Inspirado en un diseño que combina la elegancia contemporánea 
        con detalles tradicionales, nuestro espacio destaca por paredes de ladrillo visto, acabados de madera natural y toques únicos, 
        todo complementado con nuestras emblemáticas sillas Takara Belmont, reconocidas por su comodidad y estilo.
      </p>
    </div>

    <div class="bg-primary py-10 font-roboto mt-20 tracking-wide text-gray-100">
      <div class="text-center text-white mb-20">
        <h2 class="text-2xl font-medium">Servicios</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-screen-lg mx-auto p-4">
        <div 
          v-for="service in servicesStore.services" 
          :key="service.id" 
          class="border-b border-gray-300 pb-4 mb-4"
        >
          <h3 class="text-lg">{{ service.name }}</h3>
          <p class="text-sm">{{ service.description }}</p>
          <p class="font-medium">{{ service.price }} €</p>
        </div>
      </div>
    </div>
  </main>
</template>
