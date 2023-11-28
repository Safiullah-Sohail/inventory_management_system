<template>
  <v-dialog :model-value="openDialog" max-width="650" persistent>
    <custom-card>
      <v-form ref="form" v-model="validOrderForm">
        <v-row>
          <v-col cols="12" class="d-flex">
            <h4 :style="{ color: colorScheme.secondaryText }">
              {{ inEditingMode ? 'Edit Item:' : 'Create New Item' }}
              <span
                v-if="inEditingMode"
                :style="{
                  color: colorScheme.primary,
                  fontSize: '20px',
                  fontFamily: 'Poppins',
                }"
              >
                {{ itemPayload.id }}
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
              v-model="modalPayload.name"
              label="Name"
              placeholder="Name"
              :rules="rules.required"
              prepend-inner-icon="mdi-label-outline"
            />
          </v-col>
          <v-col cols="6" class="pl-1 pb-0">
            <custom-text-field
              v-model="modalPayload.price"
              type="number"
              hide-spin-buttons
              :rules="rules.itemsPrice"
              label="Price"
              placeholder="Price"
              prepend-inner-icon="mdi-cash"
            />
          </v-col>
          <v-col cols="6" class="pr-1 pb-0">
            <v-file-input
              v-model="imageUrl"
              accept="image/*"
              label="Select Image"
              placeholder="Select Image"
              prepend-inner-icon="mdi-image"
              append-inner-icon="mdi-attachment"
              prepend-icon=""
              variant="solo"
              density="compact"
              flat
              hide-details="auto"
              class="select-image-field"
              :bg-color="colorScheme.textField"
              :rounded="30"
              @update:model-value="modalPayload.imageUrl = imageUrl"
            />
          </v-col>
          <v-col cols="6" class="pl-1 pb-0">
            <v-select
              v-model="modalPayload.category"
              clearable
              flat
              open-on-clear
              :rounded="30"
              label="Select Category"
              prepend-inner-icon="mdi-tag-outline"
              placeholder="Select Category"
              :bg-color="colorScheme.textField"
              :rules="rules.required"
              variant="solo"
              density="compact"
              :hide-details="enterNewCategorySelected || 'auto'"
              :disabled="enterNewCategorySelected"
              :items="[
                'Food',
                'Drink',
                'Beverages',
                'Sea Food',
                'Enter new Category',
              ]"
              @update:model-value="categoryUpdated"
            />
          </v-col>
          <v-col
            v-if="enterNewCategorySelected"
            cols="12"
            class="pb-0"
          >
            <custom-text-field
              v-model="modalPayload.category"
              hide-spin-buttons
              :rules="rules.required"
              label="Select new Category"
              prepend-inner-icon="mdi-tag-outline"
              append-icon="mdi-close"
              placeholder="Enter new Category"
              @click:append="revertCategoryToOld"
            />
          </v-col>
          <v-col cols="12" class="">
            <v-textarea
              v-model="modalPayload.description"
              label="Description"
              variant="solo"
              placeholder="Description"
              hide-details="auto"
              prepend-inner-icon="mdi-comment-text-outline"
              flat
              :bg-color="colorScheme.textField"
              :rounded="30"
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
  import { CURRENCY_SYMBOL } from '@/enums';
  import CustomCard from '@/shared/components/CustomCard.vue';
  import CustomDatePicker from '@/shared/components/CustomDatePicker.vue';
  import CustomTextField from '@/shared/components/CustomTextField.vue';
  import SalesAndOrder from '@/shared/icons/SalesAndOrder.vue';

  export default {
    name: 'EditCreateOrderModal',
    components: {
      CustomTextField,
      CustomDatePicker,
      SalesAndOrder,
      CustomCard,
    },
    props: {
      itemPayload: {
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
        CURRENCY_SYMBOL,
        validOrderForm: true,
        searchItem: '',
        imageUrl: null,
        modalPayload: {},
        enterNewCategorySelected: false,
        inEditingMode: false,
        rules: {
          itemsPrice: [
            (v) => !!v || 'Items price is required!!',
            (v) =>
              v >= 1 || 'Items price must be a greater than zero!!',
          ],
          required: [(v) => !!v || `*Field is Required`],
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
        if (!isChanged) {
          this.$toast.info('No Change detected in the form!');
          return;
        }
        await this.$refs.form.validate();
        if (!this.validOrderForm) return;

        if (
          (!this.imageUrl || !this.imageUrl[0]) &&
          !this.isModalInEditingMode
        ) {
          this.$toast.error(
            `Please select any image for Item: (${this.modalPayload.name})`
          );
          return;
        } else if (!this.imageUrl[0]?.type?.startsWith('image/')) {
          this.$toast.error('Invalid Image file format!');
          return;
        }

        this.$toast.warning(`API not integrated`);
        this.resetDialog();
      },
      detectChangeInForm() {
        let isChanged = false;
        Object.entries(this.modalPayload).forEach(([key, value]) => {
          if (this.itemPayload[key] !== value) {
            isChanged = true;
            return;
          }
        });
        return isChanged;
      },
      categoryUpdated() {
        if (this.modalPayload.category === 'Enter new Category') {
          this.modalPayload.category = '';
          this.enterNewCategorySelected = true;
        }
      },
      revertCategoryToOld() {
        this.enterNewCategorySelected = false;
        this.modalPayload.category = this.itemPayload.category;
      },
    },
    mounted() {
      this.inEditingMode = this.isModalInEditingMode;
      this.selectedItems = JSON.parse(
        JSON.stringify(this.itemPayload.items || [])
      );
      this.modalPayload = { ...this.itemPayload };
    },
  };
</script>

<style lang="scss"></style>
