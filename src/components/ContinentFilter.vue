<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid'
import { useCountryStore } from '@/stores/country'

const store = useCountryStore()
const regions = computed(() => store.regions)
const selectedRegion = ref(store.region)

watch(selectedRegion, (newValue) => {
  store.pickRegion(newValue)
})
</script>

<template>
  <Listbox as="div" v-model="selectedRegion">
    <div class="relative w-64">
      <ListboxButton
        v-slot="{ open }"
        class="relative w-full cursor-default shadow-md rounded-md dark:bg-dark-blue bg-white h-14 pl-3 pr-16 text-left text-very-dark-blue-light-mode dark:text-white sm:text-sm sm:leading-6 font-medium"
      >
        <span class="flex items-center">
          <span class="ml-3 block truncate">{{ selectedRegion ?? 'Filter by region' }}</span>
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <ChevronUpIcon
            v-if="open"
            class="h-5 w-5 text-very-dark-blue-light-mode dark:text-white"
            aria-hidden="true"
          />
          <ChevronDownIcon
            v-else
            class="h-5 text-very-dark-blue-light-mode dark:text-white mr-2"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>
      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="no-scrollbar absolute z-10 mt-1 lg:max-h-none max-h-64 w-full overflow-auto rounded-md dark:bg-dark-blue bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="(region, index) in regions"
            :key="index"
            :value="region"
            v-slot="{ active, selected }"
          >
            <li
              class="text-very-dark-blue-light-mode dark:text-white relative hover:cursor-pointer select-none py-2 pl-3 pr-9"
            >
              <div class="flex items-center">
                <span
                  :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']"
                  >{{ region }}</span
                >
              </div>

              <span
                v-if="selected"
                :class="[
                  active
                    ? 'text-very-dark-blue-light-mode dark:text-white'
                    : 'text-very-dark-blue-light-mode dark:text-white',
                  'absolute inset-y-0 right-0 flex items-center pr-4'
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
