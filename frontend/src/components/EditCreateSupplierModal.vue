<template>
  <v-dialog :model-value="openDialog" max-width="650" persistent>
    <custom-card>
      <v-form ref="form" v-model="validForm">
        <v-row>
          <v-col cols="12" class="d-flex">
            <h4 :style="{ color: colorScheme.secondaryText }">
              {{
                inEditingMode
                  ? 'Edit Supplier:'
                  : 'Create New Supplier'
              }}
              <span
                v-if="inEditingMode"
                :style="{
                  color: colorScheme.primary,
                  fontSize: '20px',
                  fontFamily: 'Poppins',
                }"
              >
                {{ supplierPayload.fullName }}
              </span>
            </h4>

            <v-btn
              icon="mdi-close"
              class="ml-auto px-0"
              color="#ffcc9140"
              size="x-small"
              style="border-radius: 8px"
              :ripple="false"
              @click="resetDialog"
            >
            </v-btn>
          </v-col>
          <v-col cols="6" class="pr-1 pb-0">
            <custom-text-field
              v-model="modalPayload.firstName"
              label="First Name"
              placeholder="First Name"
              :rules="rules.required"
              prepend-inner-icon="mdi-account-outline"
            />
          </v-col>
          <v-col cols="6" class="pr-1 pb-0">
            <custom-text-field
              v-model="modalPayload.lastName"
              label="Last Name"
              placeholder="Last Name"
              :rules="rules.required"
              prepend-inner-icon="mdi-account-outline"
            />
          </v-col>
          <v-col cols="6" class="pr-1 pb-0">
            <custom-text-field
              v-model="modalPayload.email"
              label="Email"
              placeholder="someone@gmail.com"
              :rules="rules.email"
              prepend-inner-icon="mdi-email-outline"
            />
          </v-col>
          <v-col cols="6" class="pr-1 pb-0">
            <custom-text-field
              v-model="modalPayload.phoneNumber"
              label="Phone Number"
              placeholder="Phone Number"
              :rules="rules.required"
              prepend-inner-icon="mdi-phone-outline"
            />
          </v-col>

          <!-- Form Action -->
          <v-col
            cols="12"
            class="d-flex justify-end"
            style="gap: 0.5rem"
          >
            <v-btn
              variant="outlined"
              style="border-radius: 12px"
              :color="colorScheme.darkGray"
              @click="resetDialog"
            >
              Close
            </v-btn>
            <v-btn
              variant="elevated"
              style="border-radius: 12px"
              :color="colorScheme.primary"
              @click="submit"
            >
              Submit
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </custom-card>
  </v-dialog>
</template>

<script>
  import CustomCard from '@/shared/components/CustomCard.vue';
  import CustomDatePicker from '@/shared/components/CustomDatePicker.vue';
  import CustomTextField from '@/shared/components/CustomTextField.vue';

  export default {
    name: 'EditCreateSupplierModal',
    components: {
      CustomTextField,
      CustomDatePicker,
      CustomCard,
    },
    props: {
      supplierPayload: {
        type: Object,
        default: {},
      },
      openDialog: {
        type: Boolean,
        default: false,
      },
      isModalInEditingMode: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        validForm: true,
        modalPayload: {},
        inEditingMode: false,
        rules: {
          required: [(v) => !!v || `*Field is Required`],
          email: [
            (v) => !!v || 'E-mail is required',
            (v) => /.+@.+/.test(v) || 'E-mail must be valid',
          ],
        },
      };
    },
    methods: {
      resetDialog() {
        this.$emit('close');
        this.$refs.form.reset();
      },
      async submit() {
        const isChanged = this.detectChangeInForm();
        if (!isChanged && this.inEditingMode) {
          this.$toast.info('No Change detected in the form!');
          return;
        }
        await this.$refs.form.validate();
        if (!this.validForm) return;

        if (this.inEditingMode) {
          this.$emit('edit', { ...this.modalPayload });
        } else {
          this.$emit('submit', { ...this.modalPayload });
        }
        this.$toast.success(
          `Supplier ${
            this.inEditingMode ? 'edited' : 'created'
          } successfully!!`
        );
        this.resetDialog();
      },
      detectChangeInForm() {
        let isChanged = false;
        Object.entries(this.modalPayload).forEach(([key, value]) => {
          if (this.supplierPayload[key] !== value) {
            isChanged = true;
            return;
          }
        });
        return isChanged;
      },
    },
    mounted() {
      this.inEditingMode = this.isModalInEditingMode;
      this.modalPayload = { ...this.supplierPayload };
    },
  };
</script>

<style lang="scss"></style>
