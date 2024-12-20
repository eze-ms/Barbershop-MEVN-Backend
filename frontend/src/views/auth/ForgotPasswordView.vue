<script setup>
    import { inject } from 'vue'
    import { reset } from '@formkit/vue'
    import AuthAPI from '@/api/AuthAPI'

    const toast = inject('toast')

    const handleSubmit = async ({email}) => {
        try {
            const { data } = await AuthAPI.forgotPassword({email})
            toast.open({
                message: data.msg,
                type: 'success'
            })
            reset('forgotPassword')
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }
</script>

<template>
    <div class="bg-primary rounded my-10">
        <h1 class="font-roboto text-3xl text-white text-center py-3">Olvidé mi password</h1>
    </div>
    <p class="text-xl font-medium text-primary text-center my-5">Recupera el acceso a tu cuenta</p>

    <FormKit 
        id="forgotPassword"
        type="form" 
        :actions="false"
        incomplete-message="No se pudo acceder, revisa las notificaciones"
        @submit="handleSubmit"
    >

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

        <FormKit type="submit">Enviar</FormKit>
    </FormKit>
</template>