import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useThemeStore = defineStore('theme', () => {
    const darkModeEnabled = ref(false)

    function toggleTheme() {
        darkModeEnabled.value = !darkModeEnabled.value;

        if (darkModeEnabled.value) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    return {darkModeEnabled, toggleTheme}
})
