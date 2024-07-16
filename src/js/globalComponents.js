import NavBar from '@/components/BaseNavBar.vue'

const GlobalComponents = {
    install(Vue) {
        Vue.component (NavBar.name, NavBar)
    }
}

export default GlobalComponents;