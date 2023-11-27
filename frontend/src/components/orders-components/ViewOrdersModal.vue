<template>
  <v-dialog :model-value="openDialog" width="450" persistent>
    <custom-card>
      <v-row>
        <v-col cols="12" class="d-flex">
          <h4 :style="{ color: colorScheme.secondaryText }">
            View Orders
            <span
              :style="{
                color: colorScheme.primary,
                fontSize: '20px',
                fontFamily: 'Poppins',
              }"
            >
              {{ `(${orderDetails.id})` }}
            </span>
            Items
          </h4>

          <v-btn
            icon="mdi-close"
            class="ml-auto px-0"
            color="#ffcc9140"
            size="x-small"
            style="border-radius: 8px"
            :ripple="false"
            @click="$emit('close')"
          >
          </v-btn>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-btn
            :color="colorScheme.primary"
            variant="outlined"
            density="compact"
            style="border-radius: 8px"
            @click="$emit('openEditDialog', orderDetails)"
          >
            Edit
          </v-btn>
          <span
            class="float-right"
            :style="{ color: colorScheme.secondaryText }"
          >
            Order Date: {{ orderDetails.orderDate }}
          </span>
        </v-col>
        <v-col class="w-100">
          <v-row
            v-for="(item, index) in items"
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
                :class="$vuetify.display.smAndDown ? '' : 'mt-2'"
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
              <!-- <v-btn
                icon="mdi-close"
                :color="colorScheme.primary"
                variant="tonal"
                flat
                :ripple="false"
                density="compact"
                @click="removeItemFromOrder(index)"
              /> -->
              <div class="d-flex align-center quantity-wrapper">
                Quantity: {{ item.quantity }}
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
                  `${CURRENCY_SYMBOL} ${item.amount * item.quantity}`
                }}
              </span>
            </v-col>
            <v-col cols="12" class="py-1">
              <v-divider />
            </v-col>
          </v-row>
          <v-col cols="12" class="mt-5 px-0">
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
              {{ `${CURRENCY_SYMBOL} ${orderDetails.totalAmount}` }}
            </h4>
          </v-col>
          <div
            v-if="!items.length"
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
    </custom-card>
  </v-dialog>
</template>

<script>
  import CustomCard from '@/shared/components/CustomCard.vue';
  import SalesAndOrder from '@/shared/icons/SalesAndOrder.vue';
  import { CURRENCY_SYMBOL } from '@/enums';

  export default {
    name: 'ViewOrdersModal',
    components: {
      CustomCard,
      SalesAndOrder,
    },
    props: {
      items: {
        type: Array,
        default: [],
      },
      openDialog: {
        type: Boolean,
        default: false,
      },
      orderDetails: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {
        CURRENCY_SYMBOL,
      };
    },
  };
</script>

<style>
  .quantity-wrapper {
    border: 1px solid #45464e;
    border-radius: 8px;
    padding: 4px 12px;
  }
</style>
