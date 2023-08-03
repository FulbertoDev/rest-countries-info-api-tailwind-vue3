<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarView from '@/components/NavbarView.vue'
import { useCountryStore } from '@/stores/country'
import { onBeforeMount, onMounted } from 'vue'

const store = useCountryStore()

onBeforeMount(() => {
  store.init()
})
</script>

<template>
  <div
    class="h-screen w-screen bg-very-light-gray dark:bg-very-dark-blue-dark-mode select-none overflow-hidden"
  >
    <div>
      <NavbarView />
    </div>
    <div class="h-full overflow-hidden">
      <RouterView />
    </div>
  </div>
</template>
