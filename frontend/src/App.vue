<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

// Instancia de router y estado del usuario
const router = useRouter();
const user = useUserStore();

// Redirigir a la página de inicio de sesión
function redirectToLogin() {
  router.push({ name: "login" }); // Solo redirige al login
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Encabezado con información del usuario -->
    <div class="flex justify-between items-center p-2 bg-primary mb-10">
      <div class="flex-grow max-w-screen-lg mx-auto">
        <RouterLink :to="{ name: 'home' }">
          <h1 class="text-2xl font-roboto text-white cursor-pointer">Barbershop</h1>
        </RouterLink>
      </div>

      <!-- Iniciar Sesión, saludo y cerrar sesión -->
      <div class="flex gap-2 items-center max-w-screen-2xl mx-auto space-x-5">
        <!-- Mostrar "Iniciar Sesión" si el usuario no está autenticado -->
        <button 
          v-if="!user.user?.name" 
          type="button" 
          class="text-white font-roboto uppercase text-sm hover:underline"
          @click="redirectToLogin"
        >
          Iniciar Sesión
        </button>

        <!-- Mostrar saludo y botón "Cerrar Sesión" si el usuario está autenticado -->
        <template v-else>
          <p class="text-white text-right font-roboto uppercase text-sm">
            Hola {{ user.getUserName }}
          </p>
          <button 
            type="button" 
            class="text-white font-roboto uppercase text-sm hover:underline"
            @click="user.logout"
          >
            Cerrar Sesión
          </button>
        </template>
      </div>
    </div>

    <!-- Imagen de fondo y navegación -->
    <div class="relative bg-app bg-cover bg-center h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[600px] flex justify-center items-center">
      <div class="absolute inset-0 bg-black opacity-40"></div>

      <!-- Navegación -->
      <nav class="flex gap-10 items-center z-10">
        <!-- Mostrar "Reservar Ahora" si no está autenticado -->
        <template v-if="!user.user?.name">
          <RouterLink
            :to="{ name: 'login' }"
            class="p-3 text-gray-200 font-roboto uppercase text-xl border-b-2 border-gray-200 transition-transform duration-200 transform hover:scale-110"
          >
            Reservar Ahora
          </RouterLink>
        </template>

        <!-- Mostrar "Mis Citas" y "Nueva Cita" si está autenticado -->
        <template v-else>
          <RouterLink
            :to="{ name: 'my-appointments' }"
            class="p-3 font-roboto text-gray-200 uppercase text-xl border-b-2 border-gray-200 transition-transform duration-200 transform hover:scale-110"
          >
            Mis Citas
          </RouterLink>
          <RouterLink
            :to="{ name: 'new-appointment' }"
            class="p-3 text-gray-200 font-roboto uppercase text-xl border-b-2 border-gray-200 transition-transform duration-200 transform hover:scale-110"
          >
            Nueva Cita
          </RouterLink>
        </template>
      </nav>
    </div>

    <div class="flex-1 bg-white">
      <RouterView />
    </div>
  </div>
</template>
