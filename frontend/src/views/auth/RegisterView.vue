<script setup>
import { inject } from 'vue'
import { reset } from '@formkit/vue'
import AuthAPI from '@/api/AuthAPI'

const toast = inject('toast')

const handleSubmit = async ({password_confirm, ...formData}) => {
    try {
        const { data } = await AuthAPI.register(formData)
        toast.open({
            message: data.msg,
            type: 'success'
        })
        reset('registerForm') // Reinicia el formulario después de un registro exitoso
    } catch (error) {
        const message = error.response?.data?.msg || 'Error desconocido. Intenta nuevamente.'
        toast.open({
            message: message,
            type: 'error'
        })
    }
}

</script>

<template>
    <div class="bg-primary rounded my-10">
        <h1 class="font-roboto text-3xl text-white text-center py-3">Crear una cuenta Barbershop</h1>
    </div>
    
    <FormKit 
        id="registerForm"
        type="form" 
        :actions="false"
        incomplete-message="No se pudo acceder, revisa las notificaciones"
        @submit="handleSubmit"
    >
        <FormKit 
            type="text"
            name="name"
            placeholder="Tu Nombre"
            validation="required|length:3"
            :validation-messages="{
                required: 'El Nombre es obligatorio',
                length: 'El nombre es muy corto'
            }"
        />

        <FormKit 
            type="email"
            name="email"
            placeholder="Tu Email"
            validation="required|email" 
            :validation-messages="{
                required: 'El Email es obligatorio',
                email: 'Introduce un email válido'
            }"
        />

        <FormKit
            type="password"
            name="password"
            placeholder="Escribe una contraseña (mínimo 8 caracteres)"
            validation="required|length:4"
            :validation-messages="{
                required: 'La contraseña es obligatoria',
                length: 'La contraseña debe tener al menos 4 caracteres'
            }"
        />
            
        <FormKit
            type="password"
            name="password_confirm"
            placeholder="Repite la contraseña"
            validation="required|confirm"
            :validation-messages="{
                required: 'Por favor repite la contraseña',
                confirm: 'Las contraseñas no coinciden'
            }"
        />

        <FormKit type="submit">Enviar</FormKit>
    </FormKit>
</template>
