<template>
  <div class="app">
    <AppHeader />
    <div class="app-body">
      <Sidebar :navItems="nav" />
      <main class="main">
        <div class="container-fluid mt-3">
          <nuxt />
        </div>
      </main>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import nav from './menu'
import { Header as AppHeader, Sidebar, Footer as AppFooter, Breadcrumb } from '~/components/'

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    AppFooter,
    Breadcrumb
  },
  data () {
    return {
      nav: nav.items
    }
  },
}
</script>
