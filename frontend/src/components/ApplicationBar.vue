<template>
  <div>
    <login-signup-app-bar v-if="isLoginOrSignupPageLoaded" />
    <app-bar v-else />
  </div>
</template>

<script>
import AppBar from './AppBar.vue';
import LoginSignupAppBar from '../components/LoginSignupAppBar.vue';

export default {
  name: 'ApplicationBar',
  components: {
    AppBar,
    LoginSignupAppBar,
  },
  computed: {
    isLoginOrSignupPageLoaded() {
      return ['Login', 'Sign Up'].includes(this.getTitle(this));
    },
  },
}
</script>

<style></style>