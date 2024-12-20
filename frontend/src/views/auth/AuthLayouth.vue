<script setup>
    import { useRoute } from 'vue-router'
    const route = useRoute()

    const authRoutes = [
        { name: 'register', text: 'Crear Cuenta' },
        { name: 'login', text: 'Iniciar Sesión' },
        { name: 'forgot-password', text: 'Olvidé mi password' }
    ]
</script>

<template>
     <div class="mx-auto lg:w-3/5 mt-20">
        <RouterView />

        <nav class="mt-5 text-sm flex flex-col items-center space-y-5 lg:flex-row lg:justify-center lg:space-y-0 lg:space-x-3">
           <RouterLink 
            v-for="authRoute in authRoutes"
            class="uppercase font-bold text-primary font-roboto hover:underline"
            :to="{name: authRoute.name}"
            :class="{ 'hidden' : route.name === authRoute.name }"
           >{{ authRoute.text }}</RouterLink>
        </nav>
    </div>
</template>