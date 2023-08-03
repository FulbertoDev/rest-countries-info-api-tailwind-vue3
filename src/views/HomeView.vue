<script setup lang="ts">
import SearchIcon from '@/components/icons/SearchIcon.vue'
import ContinentFilter from '@/components/ContinentFilter.vue'
import { useCountryStore } from '@/stores/country'
import { computed, ref, watch } from 'vue'
import CountryCard from '@/components/CountryCard.vue'

const store = useCountryStore()
const countries = computed(() => {
  var result = store.countries

  if (store.query.length > 0) {
    result = result.filter((item) => item.name.toLowerCase().includes(store.query.toLowerCase()))
  }
  if (store.region != null) {
    result = result.filter((item) => item.region === store.region)
  }

  return result
})

const query = ref('')

watch(query, (value) => {
  store.setQuery(value)
})
</script>

<template>
  <main class="p-4 lg:p-12 h-full z-0 w-full">
    <div class="flex flex-col h-full w-full">
      <div
        class="flex items-start flex-1 flex-col lg:flex-row justify-start md:justify-between space-y-6 lg:space-y-0 w-full"
      >
        <div
          class="flex items-center dark:bg-dark-blue bg-white h-14 px-6 rounded-md shadow-md w-full lg:w-4/12"
        >
          <SearchIcon class="w-6 h-6 text-dark-gray dark:text-white mr-6" />
          <input
            v-model="query"
            class="placeholder:text-dark-gray dark:placeholder:text-white bg-transparent appearance-none border-2 border-none rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            placeholder="Search for a country"
          />
        </div>
        <ContinentFilter />
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-12 my-12 overflow-y-auto h-full no-scrollbar">
        <CountryCard v-for="(country, index) in countries" :key="index" :country="country" />
      </div>
    </div>
  </main>
</template>
