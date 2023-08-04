<script setup lang="ts">
import { useCountryStore } from '@/stores/country'
import { useRouter } from 'vue-router'
import { computed, onBeforeMount, ref } from 'vue'
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'

const store = useCountryStore()
const router = useRouter()

const country = computed(() => store.country)
onBeforeMount(() => {
  if (!(country as any)?.value) {
    router.back()
  }
})
</script>

<template>
  <main class="p-4 lg:p-24 h-full z-0 w-full text-very-dark-blue-light-mode dark:text-white overflow-y-auto">
    <div class="flex flex-col h-full w-full">
      <button
        @click="router.back()"
        class="w-fit flex cursor-pointer shadow-md rounded-md dark:bg-dark-blue bg-white py-2 px-6 space-x-2 text-very-dark-blue-light-mode dark:text-white"
      >
        <ArrowLeftIcon class="w-4" />
        <span>Back</span>
      </button>
      <div class="my-12 overflow-hidden h-full no-scrollbar w-full flex-col lg:flex-row gap-16">
        <div class="w-full lg:w-2/5">
          <img class="w-full aspect-video" :src="`${(country as any)?.flags.svg}`" alt="flag" />
        </div>
        <div class="w-full lg:w-3/5 flex flex-col py-8">
          <span class="text-3xl font-extrabold">{{ (country as any)?.name.common }}</span>
          <div class="grid grid-cols-1 md:grid-cols-2 my-12">
            <div class="flex flex-col text-lg space-y-2">
              <span><strong>Native Name:</strong>
                {{ (Object.values((country as any)?.name?.nativeName)[0] as any).common }}
              </span>
              <span
                ><strong>Population:</strong>
                {{ new Intl.NumberFormat('en-US').format((country as any)?.population) }}</span
              >
              <span><strong>Region:</strong> {{ (country as any)?.region }}</span>
              <span><strong>Sub Region:</strong> {{ (country as any)?.subregion }}</span>
              <span><strong>Capital:</strong> {{ (country as any)?.capital[0] ?? '--' }}</span>
            </div>
            <div class="flex flex-col text-lg space-y-2">
              <span
                ><strong>Top Level Domain:</strong>
                {{ ((country as any)?.tld ?? []).join(' - ') ?? '--' }}</span
              >
              <span
                ><strong>Currencies:</strong>
                {{
                  Object.values((country as any)?.currencies ?? {})
                    .map((item:any) => item.name)
                    .join(' - ')
                }}</span
              >
              <span
                ><strong>Languages:</strong>
                {{ Object.values((country as any)?.languages ?? {}).join(' - ') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
