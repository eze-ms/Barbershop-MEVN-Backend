<script setup>
  import { onMounted, inject } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import AuthAPI from '@/api/AuthAPI'

  const toast = inject('toast')
  const router = useRouter()
  const route = useRoute()
  const { token } = route.params
  
  onMounted(async () => {
    try {
      const { data } = await AuthAPI.verifyAccount(token)
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
  })
</script>

<template>
   <div class="bg-primary rounded my-10">
        <h1 class="font-roboto text-3xl text-white text-center py-3">Verifica tu cuenta Barbershop</h1>
    </div>
</template>