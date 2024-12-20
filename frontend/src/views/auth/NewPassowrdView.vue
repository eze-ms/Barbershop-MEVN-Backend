<script setup>
    import { inject, onMounted, ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import AuthAPI from '@/api/AuthAPI'

    const toast = inject('toast')
    const router = useRouter()
    const route = useRoute()
    const { token } = route.params

    const validToken = ref(false)
    
    onMounted(async() => {
        try {
            const { data } = await AuthAPI.verifyPasswordResetToken(token)
            validToken.value = true
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    })

    const handleSubmit = async ({password}) => {
        
        try {
            const { data } = await AuthAPI.updatePassword(token, {password})
            toast.open({
                message: data.msg,
                type: 'success'
            })
            setTimeout(() => {
                router.push({name: 'login'})
            }, 3000)
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

</script>

<template>
    <div v-if="validToken">
        <div class="bg-primary rounded my-10">
            <h1 class="font-roboto text-3xl text-white text-center py-3">Nuevo Password</h1>
        </div>
        <p class="text-xl font-medium text-primary text-center my-5">Coloca tu nuevo password</p>

        <FormKit 
            id="newPasswordForm"
            type="form" 
            :actions="false"
            incomplete-message="No se pudo acceder, revisa las notificaciones"
            @submit="handleSubmit"
        >

            <FormKit
                type="password"
                name="password"
                placeholder="Escribe una contraseña (mínimo 8 caracteres)"
                validation="required|length:8"
                :validation-messages="{
                    required: 'La contraseña es obligatoria',
                    length: 'La contraseña debe tener al menos 8 caracteres'
                }"
            />
            <FormKit type="submit">Guardar</FormKit>
        </FormKit>
    </div>

    <p v-else class="text-center text-primary text-3xl font-black">Token no válido</p>
</template>