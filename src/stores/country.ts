import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios, { Axios } from 'axios'
import collect from 'collect.js'

export const useCountryStore = defineStore('country', () => {
  const query = ref('')

  const country = ref(null)
  const countries = ref([])

  const region = ref(null)
  const regions = ref([])

  async function init() {
    const response = await getCountries()
    console.log('COUNT: ', response.length)
    const collection = collect(response)
    const sorted = collection.sortBy('name.common')
    countries.value = sorted.all()
    regions.value = [...new Set(countries.value.map((item) => item.region))]
  }

  function setQuery(q) {
    query.value = q
  }

  function pickCountry(c: any) {
    country.value = c
  }

  function pickRegion(r: any) {
    region.value = r
  }

  async function getCountries() {
    const instance = axios.create({
      baseURL: 'https://restcountries.com/v3.1/'
    })

    const interceptor = axios.interceptors.response.use(
      function (response) {
        return response
      },
      function (error) {
        console.log(`Error: ${error}`)
        return Promise.resolve([])
      }
    )

    instance.interceptors.response.use(interceptor)
    const response = await instance.get('all?fields=name,flags,population,capital,region,languages,tld,currencies')
    return response.data
  }

  return { country, countries, pickCountry, region, regions, pickRegion, init, setQuery, query }
})
