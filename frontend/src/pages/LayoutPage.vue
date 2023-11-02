<template>
  <div>
    <v-container ref="nav-bar" fluid class="px-16">
      <router-view />
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'LayoutPage',
  };
</script>
