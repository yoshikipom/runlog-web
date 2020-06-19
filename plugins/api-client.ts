import { DefaultApi } from "@/api-client";
import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
    interface Vue {
        $apiClient: DefaultApi
    }
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        $apiClient: DefaultApi
    }
}

declare module 'vuex/types/index' {
    interface Store<S> {
        $apiClient: DefaultApi
    }
}

const apiClientPlugin: Plugin = ({ $axios }, inject) => {
    const apiClient: DefaultApi = new DefaultApi(undefined, "/api", $axios);
    inject('apiClient', apiClient)
}

export default apiClientPlugin
