import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import collect from 'collect.js'

export const useCountryStore = defineStore('country', () => {
  const query = ref('')

  const country = ref(null)
  const countries = ref(<any>[])

  const region = ref(null)
  const regions = ref(<any>[])

  async function init() {
    const response = await getCountries()
    console.log('COUNT: ', response.length)
    const collection = collect(response)
    const sorted = collection.sortBy('name.common')
    countries.value = sorted.all()
    regions.value = [...new Set(countries.value.map((item: any) => item?.region))]
  }

  function setQuery(q: any) {
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

    instance.interceptors.response.use(
      function (response) {
        return response
      },
      function (error) {
        console.log(`Error: ${error}`)
        return Promise.resolve([])
      }
    )
    const response = await instance.get(
      'all?fields=name,flags,population,capital,region,languages,tld,currencies'
    )
    return response.data
  }

  return { country, countries, pickCountry, region, regions, pickRegion, init, setQuery, query }
})
