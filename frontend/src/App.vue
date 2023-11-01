<template>
  <v-app class="App">
    <application-bar />
    <v-main class="main-container d-flex justify-center align-center">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { VApp } from 'vuetify/lib/components/index.mjs';
import ApplicationBar from './components/ApplicationBar.vue';

export default {
  name: "App",
  components: {
    VApp,
    ApplicationBar,
  },
};
</script>

<style lang="scss">
.main-container {
  background-color: #E5E5E5;
  padding: 90px 0 48px 0 !important;

  .v-main__wrap {
    height: calc(100vh - 65px);
    overflow-y: scroll;

    >.container {
      min-height: calc(100vh - 115px) !important;
    }
  }
}

.h1,
h2,
h3,
h4 {
  font-family: 'Poppins';
  font-size: 20px;
  font-weight: 800;
  color: #8496eb;
}

.span,
* {
  font-family: 'Inter';
  font-size: 14px;
}

div,
span,
h1,
h2,
h3,
h4,
h5,
h6 {
  white-space: pre-wrap;
}

.font-18 {
  font-size: 18px;
}

.text-main {
  color: #5570F1;
}

@media (max-width: 600px) {
  .Toastify__toast {
    width: 280px;
  }

  .Toastify__toast-container {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: 0.4rem;
  }
}

/* Hide scrollbar for Chrome, Safari and Opera */
body::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
body {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

/* width */
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.v-data-table__wrapper::-webkit-scrollbar {
  height: 7px;
}

.break-word {
  word-break: break-word;
}

.w-100 {
  width: 100% !important;
}

.postion-relative {
  position: relative;
}

.v-chip {
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 0%),
    0px 1px 5px 0px rgb(0 0 0 / 0%);
  padding: 15px;
  width: 100px;
  justify-content: center;
}

$dark-mode-autofill-text-color: #1e1e1e;
$light-mode-autofill-text-color: rgba(0, 0, 0, 0.87);

// .theme--light.v-sheet,
// .theme--light.v-expansion-panels .v-expansion-panel,
// .theme--light.v-date-picker-header
//   .v-date-picker-header__value:not(.v-date-picker-header__value--disabled),
//   button:not(:hover):not(:focus) {
//   color: rgba(0, 0, 0, 0.6) !important;
// }

.dark-mode {

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px $dark-mode-autofill-text-color inset !important;
  }

  /*Change text in autofill textbox*/
  input:-webkit-autofill {
    -webkit-text-fill-color: white !important;
  }
}

.light-mode {

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }

  /*Change text in autofill textbox*/
  input:-webkit-autofill {
    -webkit-text-fill-color: $light-mode-autofill-text-color !important;
  }
}
</style>

