<template>
  <v-card
    style="border-radius: 12px"
    :class="!$vuetify.display.xs ? 'py-11 px-8' : 'py-8 px-5 mx-10'"
  >
    <v-card-title class="text-center pb-6">
      <v-img
        :src="require('../assets/Logo.png')"
        height="40"
        style="margin-bottom: 30px"
      />
      <h4
        style="font-style: normal; font-weight: 700; line-height: normal"
      >
        <span class="font-18 text-black">
          Get started with</span> Inventory <br>
        Management System
      </h4>
      <span
        class="text-grey-lighten-1"
        style="font-size: 14px; font-family: inter"
      >
        Create your free account
      </span>
    </v-card-title>
    <v-card-text class="py-0 mt-5">
      <v-form
        ref="signupForm"
        v-model="validForm"
        style="gap: 15px; display: grid"
      >
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6"
            :class="$vuetify.display.xs ? 'px-2 pb-2' : 'pr-2 pl-0 pb-2'"
          >
            <v-text-field
              v-model="userPayload.firstName"
              id="First Name"
              variant="solo"
              :bg-color="colorScheme.textField"
              density="compact"
              :rules="rules.required"
              placeholder="First Name"
              hide-details
              :rounded="30"
              prepend-inner-icon="mdi-account-outline"
              flat
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
            :class="$vuetify.display.xs ? 'px-2 pb-2' : 'pl-2 pr-0 pb-2'"
          >
            <v-text-field
              v-model="userPayload.lastName"
              id="Last Name"
              variant="solo"
              :bg-color="colorScheme.textField"
              density="compact"
              :rules="rules.required"
              placeholder="Last Name"
              hide-details
              :rounded="30"
              prepend-inner-icon="mdi-account-outline"
              flat
            />
          </v-col>
          <v-col
            cols="12"
            :class="$vuetify.display.xs ? 'px-2 pb-2' : 'px-0 pb-2'"
          >
            <v-text-field
              id="Email Address"
              v-model="userPayload.email"
              variant="solo"
              :rules="rules.email"
              :bg-color="colorScheme.textField"
              density="compact"
              hide-details
              :rounded="30"
              prepend-inner-icon="mdi-email-outline"
              flat
              placeholder="Email Address"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
            :class="$vuetify.display.xs ? 'px-2 pb-2' : 'pr-2 pl-0 pb-2'"
          >
            <v-text-field
              v-model="userPayload.password"
              id="Password"
              variant="solo"
              :bg-color="colorScheme.textField"
              density="compact"
              :rules="rules.password"
              placeholder="Password"
              hide-details
              :rounded="30"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
              flat
              @click:append-inner="showPassword = !showPassword"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
            :class="$vuetify.display.xs ? 'px-2 pb-2' : 'pl-2 pr-0 pb-2'"
          >
            <v-text-field
              v-model="userPayload.passcode"
              id="Passcode"
              variant="solo"
              :bg-color="colorScheme.textField"
              density="compact"
              :rules="rules.passcode"
              placeholder="Passcode"
              hide-details
              :rounded="30"
              :type="showPasscode ? 'text' : 'password'"
              prepend-inner-icon="mdi-key-variant"
              :append-inner-icon="showPasscode ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
              flat
              @click:append-inner="showPasscode = !showPasscode"
            />
          </v-col>
        </v-row>
      </v-form>
      <router-link
        to="/sign-up"
        class="text-decoration-none float-right text-main mt-3"
      >
        Recover Password
      </router-link>
      <br>
      <div class="text-center text-grey-lighten-1 my-10">
        Already have an account?
        <router-link
          to="/login"
          class="text-decoration-none text-main"
        >Login</router-link>
        <br>
      </div>
    </v-card-text>
    <v-card-actions class="pt-0 justify-center">
      <v-btn
        class="py-6 d-flex align-center"
        variant="flat"
        width="140px"
        style="border-radius: 12px;"
        :color="colorScheme.primary"
        @click="onSignUp"
      >
        SignUp
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'LoginPage',
  components: {
  },
  data: () => ({
    validForm: false,
    errorMessage: '',
    userPayload: {
      firstName: 'Jawad',
      lastName: 'Haider',
      email: 'jhaider869@gmail.com',
      password: '12345678s',
      passcode: '0987',
    },
    showPassword: false,
    showPasscode: false,
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
      passcode: [
        (v) => !!v || 'Passcode is required',
        (v) => /^\d+$/.test(v) || 'Passcode must only contain digits',
        (v) => v.length >= 6 || 'Passcode must contain atleast 6 digits',
      ],
      required: [(v) => !!v || 'All Fields are required*'],
    },
  }),
  methods: {
    // ...mapActions('global', ['login']),
    async onSignUp() {
      this.$refs.signupForm?.validate().then(response => {
        const errors = response.errors
        if (errors.length) {
          this.errorMessage = errors[0].errorMessages[0];

          if (this.errorMessage.includes('required')) {
            this.$toast.error(`Field (${errors[0].id}) is required!`);
            return;
          }
          this.$toast.error(`${this.errorMessage}`);
        }
      })
      if (!this.validForm) return;
      // await this.login({
      //   email: this.email,
      //   password: this.password,
      // });
      // this.$router.push('/dashboard');
      this.$toast.info('API integration not done yet!')
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