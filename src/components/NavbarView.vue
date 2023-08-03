<script setup lang="ts">
import {useThemeStore} from "@/stores/theme";
import MoonIcon from "@/components/icons/MoonIcon.vue";

const themeStore = useThemeStore();
</script>

<template>
  <div class="flex justify-between py-4 px-8 lg:py-6 lg:px-16 dark:bg-dark-blue bg-white shadow">
    <span class="font-bold dark:text-white text-lg text-very-dark-blue-light-mode">Where in the world?</span>
    <div @click="themeStore.toggleTheme()" class="hover:cursor-pointer">
      <div class="flex items-center space-x-2">
        <MoonIcon class="h-4 w-4"/>
        <span class="font-normal text-sm dark:text-white text-very-dark-blue-light-mode">Dark Mode</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>