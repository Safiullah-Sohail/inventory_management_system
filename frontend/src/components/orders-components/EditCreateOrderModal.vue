<template>
  <v-dialog :model-value="openDialog" max-width="650" persistent>
    <custom-card>
      <v-form ref="orderForm" v-model="validOrderForm">
        <v-row>
          <v-col cols="12" class="d-flex">
            <h4 :style="{ color: colorScheme.secondaryText }">
              {{ inEditingMode ? 'Edit Order' : 'Create New Order' }}
              <span
                :style="{
                  color: colorScheme.primary,
                  fontSize: '20px',
                  fontFamily: 'Poppins',
                }"
              >
                {{ orderPayload.id }}
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
          <v-col cols="12">
            <custom-date-picker
              id="Order Date"
              :selectedDateValue="orderPayload.orderDate"
              label="Enter Order Date"
              :required="true"
              @input="
                (selectedDate) =>
                  (orderPayload.orderDate = selectedDate)
              "
            />
          </v-col>

          <!-- Search & Order Items -->
          <v-col cols="12">
            <v-row>
              <v-col cols="12">
                <custom-text-field
                  v-model="searchItem"
                  label="Search Item's Name"
                  placeholder="Search Item's Name"
                  prepend-inner-icon="mdi-magnify"
                />
              </v-col>
              <!-- Searched Items -->
              <v-col class="w-100">
                <v-row
                  v-for="(item, index) in searchItems"
                  :key="index"
                  class="align-center"
                  style="cursor: pointer"
                  @click="addItemInOrder(item.id)"
                >
                  <v-col
                    cols="2"
                    md="2"
                    sm="2"
                    :class="$vuetify.display.smAndDown ? 'pa-0' : ''"
                  >
                    <v-img
                      :src="require('@/assets/Logo.png')"
                      height="30"
                    />
                  </v-col>
                  <v-col
                    cols="10"
                    md="10"
                    sm="10"
                    class="d-flex"
                    :class="$vuetify.display.smAndDown ? 'pb-0' : ''"
                  >
                    <div class="d-flex flex-column">
                      <span style="font-weight: 600">
                        {{ item.name }}
                      </span>
                      <span style="font-size: 12px">
                        {{ `Category: ${item.category}` }}
                      </span>
                    </div>
                    <span style="font-weight: 700; margin-left: auto">
                      {{ `${CURRENCY_SYMBOL} ${item.amount}` }}
                    </span>
                  </v-col>
                  <v-col
                    cols="12"
                    class="py-1"
                    v-if="index + 1 !== searchItems.length"
                  >
                    <v-divider />
                  </v-col>
                </v-row>
                <div
                  v-if="!searchItem.length"
                  class="d-flex align-center justify-center h-75"
                >
                  <p class="text-center">
                    Search Items to see here!!
                  </p>
                </div>
                <div
                  v-else-if="!searchItems.length"
                  class="d-flex align-center justify-center h-75"
                >
                  <p class="text-center">No Item Found!!</p>
                </div>
              </v-col>
              <!-- Vertical Divider -->
              <v-col
                cols="1"
                class="d-flex justify-center px-0"
                style="max-width: min-content"
              >
                <div
                  style="
                    background-color: #817a7a6e;
                    height: 100%;
                    width: 2px;
                  "
                ></div>
              </v-col>
              <!-- Added Items -->
              <v-col class="w-100">
                <v-row
                  v-for="(item, index) in selectedItems"
                  :key="index"
                  class="align-center"
                >
                  <v-col
                    cols="2"
                    md="2"
                    sm="2"
                    :class="$vuetify.display.smAndDown ? 'pa-0' : ''"
                  >
                    <v-img
                      :src="require('@/assets/Logo.png')"
                      height="30"
                    />
                  </v-col>
                  <v-col
                    cols="10"
                    md="5"
                    sm="10"
                    class="d-flex flex-column"
                    :class="$vuetify.display.smAndDown ? 'pb-0' : ''"
                  >
                    <span>{{ item.name }}</span>
                    <span
                      :class="
                        $vuetify.display.smAndDown ? '' : 'mt-2'
                      "
                      style="font-weight: 700"
                    >
                      {{ `${CURRENCY_SYMBOL} ${item.amount}` }}
                    </span>
                  </v-col>
                  <v-col
                    cols="12"
                    md="5"
                    sm="12"
                    class="d-flex align-end pl-0"
                    :class="
                      $vuetify.display.smAndDown
                        ? 'flex-row pt-0 justify-end mt-2'
                        : 'flex-column'
                    "
                    :style="$vuetify.display.sm ? 'gap: 0.2em' : ''"
                  >
                    <span
                      style="
                        color: red;
                        cursor: pointer;
                        font-size: 12px;
                        font-weight: 600;
                        margin-right: 8px;
                        margin-bottom: 4px;
                        text-decoration: underline;
                      "
                      @click="removeItemFromOrder(index)"
                    >
                      {{ 'Remove' }}
                    </span>
                    <div class="d-flex align-center">
                      <v-btn
                        icon="mdi-minus"
                        :color="colorScheme.primary"
                        density="compact"
                        variant="text"
                        :ripple="false"
                        :disabled="
                          !validOrderForm || item.quantity === 1
                        "
                        @click="item.quantity--"
                      />
                      <custom-text-field
                        v-model="item.quantity"
                        :id="`item-quantity-${index}`"
                        variant="outlined"
                        :hide-details="true"
                        :rules="rules.itemQuantity"
                        style="min-width: 40px; max-width: 60px"
                        :style="{
                          width: `${getItemQuantityWidth(
                            item.quantity
                          )}px`,
                        }"
                      />
                      <v-btn
                        icon="mdi-plus"
                        :color="colorScheme.primary"
                        density="compact"
                        variant="text"
                        :ripple="false"
                        :disabled="!validOrderForm"
                        @click="item.quantity++"
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <span
                      :style="{
                        color: colorScheme.secondaryText,
                      }"
                    >
                      Sub-total
                    </span>
                    <span
                      :style="{
                        color: colorScheme.secondaryText,
                        fontWeight: '600',
                      }"
                      class="float-right"
                    >
                      {{
                        `${CURRENCY_SYMBOL} ${
                          item.amount * item.quantity
                        }`
                      }}
                    </span>
                  </v-col>
                  <v-col cols="12" class="py-1">
                    <v-divider />
                  </v-col>
                  <v-col
                    v-if="index + 1 === selectedItems.length"
                    cols="12"
                    class="mt-5"
                  >
                    <span
                      :style="{
                        color: colorScheme.secondaryText,
                        fontSize: '16px',
                      }"
                    >
                      Total
                    </span>
                    <h4
                      :style="{
                        color: colorScheme.secondaryText,
                        fontSize: '18px',
                      }"
                      class="float-right"
                    >
                      {{
                        `${CURRENCY_SYMBOL} ${calculateTotalAmount}`
                      }}
                    </h4>
                  </v-col>
                </v-row>
                <div
                  v-if="!selectedItems?.length"
                  class="d-flex flex-column justify-center align-center"
                >
                  <div class="icon-container">
                    <sales-and-order :width="45" :height="45" />
                  </div>
                  <h4
                    :style="{
                      color: colorScheme.darkGray,
                      marginTop: '12px',
                    }"
                  >
                    {{ 'Add Items to your Order' }}
                  </h4>
                  <p class="text-center">
                    {{ 'Search and add items to this order' }}
                  </p>
                </div>
              </v-col>
            </v-row>
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
              @click="createOrder"
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
      orderPayload: {
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
        inEditingMode: false,
        rules: {
          itemQuantity: [
            (v) => !isNaN(v) || 'Items quantity must be a number!!',
            (v) => !!v || 'Items quantity is required!!',
            (v) =>
              v >= 1 ||
              'Items quantity must be a greater than zero!!',
          ],
        },
        items: [
          {
            id: 1,
            name: 'Iphone 13',
            category: 'Phone',
            amount: 123000,
            date: '12 Sep 2023',
            status: 'Pending',
          },
          {
            id: 2,
            name: 'Iphone X',
            category: 'Phone',
            amount: 123000,
            date: '12 Sep 2023',
            status: 'Completed',
          },
        ],
        selectedItems: [],
      };
    },
    computed: {
      searchItems() {
        if (this.searchItem) {
          const textValue = this.searchItem.toLowerCase();
          const filteredObj = this.items.filter((item) => {
            let isFound = false;
            if (item.name.toLowerCase().indexOf(textValue) > -1) {
              isFound = true;
            }
            return isFound;
          });
          const list = Object.keys(filteredObj).map((key) => ({
            ...filteredObj[key],
          }));
          return list;
        }

        return [];
      },
      calculateTotalAmount() {
        let totalAmount = 0;
        this.selectedItems.forEach((item) => {
          totalAmount += item.amount * item.quantity;
        });
        return totalAmount;
      },
    },
    watch: {
      validOrderForm(newValue) {
        if (
          !newValue &&
          newValue !== null &&
          this.$refs.orderForm.errors[0].id !== 'Order Date'
        ) {
          const errMsg =
            this.$refs.orderForm?.errors[0]?.errorMessages[0] ||
            'Form is invalid';
          if (errMsg) {
            this.$toast.error(errMsg);
          }
        }
      },
    },
    methods: {
      resetDialog() {
        this.$emit('close');
        this.searchItem = '';
      },
      async createOrder() {
        const isValid = await this.formValidationChecker(
          this.$refs.orderForm
        );
        if (!isValid) return;
        if (!this.selectedItems?.length) {
          this.$toast.error(
            'Please add items to your order to continue!!'
          );
          return;
        }
        this.orderPayload.items = this.selectedItems;
        this.$toast.warning(`API not integrated`);
        this.resetDialog();
      },
      addItemInOrder(id) {
        // if (!this.orderPayload.items) {
        //   this.orderPayload.items = [];
        // }
        const item = this.items.find((item) => item.id === id);
        this.selectedItems.push({
          ...(item || {}),
          quantity: 1,
        });
      },
      removeItemFromOrder(index) {
        this.selectedItems = this.selectedItems.filter(
          (item, idx) => index !== idx
        );
      },
      getItemQuantityWidth(number) {
        let width = 40;
        const lengthOfNumber = number.toString().length;
        if (lengthOfNumber > 1) {
          width += lengthOfNumber * 5;
        }
        return width;
      },
    },
    mounted() {
      this.inEditingMode = this.isModalInEditingMode;
      this.selectedItems = JSON.parse(
        JSON.stringify(this.orderPayload.items || [])
      );
    },
  };
</script>

<style></style>
