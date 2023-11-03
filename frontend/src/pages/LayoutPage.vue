<template>
  <div>
    <v-container ref="nav-bar" fluid style="padding-left: calc(64px);">
      <router-view />
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'LayoutPage',
  };
</script>
