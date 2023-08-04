<script setup lang="ts">
import { useCountryStore } from '@/stores/country'
import { useRouter } from 'vue-router'

const store = useCountryStore()
const router = useRouter()

const props = defineProps({
  country: Object
})

function onclick() {
  store.pickCountry(props.country)
  router.push({name: 'details'})
}
</script>

<template>
  <div
    class="flex flex-col h-fit bg-white dark:bg-dark-blue rounded-md md:mx-0 mx-6 dark:text-white"
    @click="onclick"
  >
    <img class="aspect-video object-cover rounded-t-md" :src="props.country?.flags.svg" alt="flag" />
    <div class="p-6 flex flex-col">
      <span class="font-bold text-lg">{{ props.country?.name.common }}</span>
      <div class="flex space-x-2 mt-4">
        <span class="font-semibold text-md">Population:</span>
        <span class="font-light text-md">
          {{ new Intl.NumberFormat('en-US').format(props.country?.population) }}
        </span>
      </div>
      <div class="flex space-x-2">
        <span class="font-semibold text-md">Region:</span>
        <span class="font-light text-md">{{ props.country?.region }}</span>
      </div>
      <div class="flex space-x-2">
        <span class="font-semibold text-md">Capital:</span>
        <span class="font-light text-md">
          {{ (props.country?.capital ?? ["--"])[0]}}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
