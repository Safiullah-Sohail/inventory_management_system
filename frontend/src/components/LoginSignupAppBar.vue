<template>
  <v-app-bar
    density="compact"
    height="70"
  >
    <v-app-bar-nav-icon
      :style="!$vuetify.display.xs ? 'margin-left: 100px' : 'margin-left: 20px'"
    >
      <v-img
        :src="require('../assets/Logo.png')"
        height="36"
        width="36"
      />
    </v-app-bar-nav-icon>
    <v-app-bar-title class="py-6">
      <h4>{{ APP_PREFIX }}</h4>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: 'LoginSignupAppBar'
}
</script>

<style></style>