<script setup>
import { useUserStore } from '@/stores/user';
import { inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AuthAPI from '@/api/AuthAPI';

const { setUser, getUserAppointments } = useUserStore(); // Importar la función para actualizar el usuario
const toast = inject('toast');
  const router = useRouter();

  // Función de login
  const handleSubmit = async (formData) => {
    try {
      const response = await AuthAPI.login(formData); // Llama a la API de login
      const { data: { token, user } } = response; // Extrae token y usuario
      localStorage.setItem('AUTH_TOKEN', token);

      setUser(user); // Actualiza el estado del usuario
      await getUserAppointments(); // Carga las citas del usuario

      router.push({ name: 'my-appointments' }); // Redirige después del login
    } catch (error) {
      const message = error.response?.data?.msg || 'Error desconocido. Intenta nuevamente.';
      toast.open({
        message: message,
        type: 'error',
      });
    }
  };

  // Scroll automático al cargar la vista
  onMounted(() => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.scrollIntoView({ behavior: 'smooth' });
    }
  });
</script>

<template>
  <div class="bg-primary rounded my-10">
    <h1 class="font-roboto text-3xl text-white text-center py-3">¡Bienvenido de nuevo!</h1>
  </div>
  <FormKit 
    id="loginForm"
    type="form" 
    :actions="false"
    incomplete-message="No se pudo acceder, revisa las notificaciones"
    @submit="handleSubmit"
  >
    <FormKit 
      type="email"
      name="email"
      placeholder="Tu Email"
      value="admin@admin.com"
      validation="required|email" 
      :validation-messages="{
          required: 'El Email es obligatorio',
          email: 'Introduce un email válido'
      }"
    />

    <FormKit
      type="password"
      name="password"
      placeholder="Escribe una contraseña"
      value="admin"
      validation="required"
      :validation-messages="{
          required: 'La contraseña es obligatoria',
          length: 'La contraseña debe tener al menos 4 caracteres'
      }"
    />
    <FormKit type="submit">Iniciar Sesión</FormKit>
    
  </FormKit>
</template>
