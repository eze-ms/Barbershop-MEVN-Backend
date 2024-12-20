<script setup>
    import { useUserStore } from '../../stores/user'
    const user = useUserStore()
</script>

<template>
    <div class="max-w-screen-lg mx-auto p-4">
        <div>
            <h2 class="text-xl lg:text-2xl font-bold text-primary">Panel de Administración</h2>
        </div>

        <div class="flex flex-col space-y-5">
              <div class="flex gap-2 items-center">
                  <p class="text-primary font-bold text-xl text-right">Hola {{ user.getUserName }}!</p>
              </div>
          </div>
    </div>
    <main class="space-y-6">
       <RouterView />
    </main>
</template>