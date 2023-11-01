<template>
  <v-card
    style="border-radius: 12px"
    :class="!$vuetify.display.xs ? 'py-11 px-8' : 'py-8 px-5 mx-8'"
  >
    <v-card-title class="text-center pb-6">
      <v-img
        :src="require('../assets/Logo.png')"
        height="40"
        style="margin-bottom: 30px"
      />
      <h4 style="font-style: normal; font-weight: 700; line-height: normal">
        Welcome Back!
      </h4>
      <span
        class="text-grey-lighten-1"
        style="font-size: 14px; font-family: inter"
      >
        Login to your account
      </span>
    </v-card-title>
    <v-card-text class="mt-5">
      <v-form
        ref="loginForm"
        v-model="validForm"
        style="gap: 15px; display: grid"
        class="mb-2"
      >
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              variant="solo"
              :rules="rules.email"
              :bg-color="colorScheme.textField"
              density="compact"
              hide-details
              :rounded="30"
              prepend-inner-icon="mdi-email-outline"
              flat
              id="Email Address"
              placeholder="someone@gmail.com"
              label="Email Address"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              variant="solo"
              :bg-color="colorScheme.textField"
              density="compact"
              :rules="rules.password"
              id="Password"
              hide-details
              :rounded="30"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
              flat
              @click:append-inner="showPassword = !showPassword"
              label="Password"
            />
          </v-col>
        </v-row>
      </v-form>
      <a
        href=""
        class="text-decoration-none float-right text-main"
      >
        Recover Password
      </a>
      <br>
      <div class="text-center text-grey-lighten-1 my-10">
        Don't have an account?
        <router-link
          to="/sign-up"
          class="text-decoration-none text-main"
        >Sign Up</router-link>
      </div>
    </v-card-text>
    <v-card-actions class="pt-0 justify-center">
      <v-btn
        class="py-6 d-flex align-center"
        variant="flat"
        width="140px"
        style="border-radius: 12px;"
        :color="colorScheme.primary"
        @click="onLogin"
      >
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import LoginSignupAppBar from '../components/LoginSignupAppBar.vue';

export default {
  name: 'LoginPage',
  components: {
    LoginSignupAppBar,
  },
  data: () => ({
    validForm: false,
    email: '',
    password: '',
    showPassword: false,
    rules: {
      email: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      password: [
        (v) => !!v || 'Password is required',
        (v) =>
          v.length >= 8 ||
          'Password must be greater than or equal to 8 characters',
      ],
    },
  }),
  methods: {
    // ...mapActions('global', ['login']),
    async onLogin() {

      this.$refs.loginForm?.validate().then(response => {
        const errors = response.errors
        if (errors.length) {
          this.errorMessage = errors[0].errorMessages[0];

          if (this.errorMessage.includes('required')) {
            this.$toast.error(`${errors[0].id} is required!`);
            return;
          }
          this.$toast.error(`${this.errorMessage}`);
        }
      })

      // await this.login({
      //   email: this.email,
      //   password: this.password,
      // });
      // this.$router.push('/dashboard');
    },
  },
};
</script>

<style lang="scss">
.v-field__prepend-inner {
  i {
    color: #6a6a6b;
  }
}

.v-field__append-inner {
  i {
    color: #6a6a6b;
  }
}
</style>