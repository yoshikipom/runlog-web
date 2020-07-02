<template>
  <header class="app-header navbar">
    <button
      class="navbar-toggler mobile-sidebar-toggler d-lg-none"
      type="button"
      @click="mobileSidebarToggle"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <button
      class="navbar-toggler sidebar-toggler d-md-down-none"
      type="button"
      @click="sidebarToggle"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-link class="navbar-brand" to="/"></b-link>
    <b-navbar-nav class="d-md-down-none">
      <b-link class="nav-link px-3" to="/dashboard">Dashboard</b-link>
      <b-link class="nav-link px-3" to="/record">Record</b-link>
      <b-link class="nav-link px-3" to="/social">Social</b-link>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto mr-2">
      <b-link class="nav-link px-3" to="/setting">
        <i class="icon-settings"></i>
      </b-link>
      <b-link class="nav-link px-3" to="/login">
        <i class="icon-logout"></i>
      </b-link>
    </b-navbar-nav>
  </header>
</template>

<script>
  export default {
    name: 'c-header',
    methods: {
      sidebarToggle (e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-hidden')
      },
      sidebarMinimize (e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-minimized')
      },
      mobileSidebarToggle (e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-mobile-show')
      },
    }
  }
</script>
