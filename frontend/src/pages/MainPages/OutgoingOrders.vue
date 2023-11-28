<template>
  <v-row class="px-4">
    <v-col cols="12" class="d-flex">
      <h4 :style="{ color: colorScheme.darkGray }">
        {{ 'Outgoing Orders' }}
      </h4>

      <v-btn
        class="ml-auto"
        :color="colorScheme.primary"
        style="border-radius: 12px"
        prepend-icon="mdi-plus"
        @click="toggleEditCreateDialog = true"
      >
        {{ 'Create a New Order' }}
      </v-btn>
    </v-col>

    <v-col cols="12">
      <custom-card>
        <data-table-wrapper
          title="Outgoing Orders"
          :headers="headers"
          :items="AllOrders"
          :search-fields="['name', 'location']"
          :filter-config="{ type: 'date' }"
          @toggleViewModal="openViewModal"
          @delete="onDeleteOrder"
        />
      </custom-card>
    </v-col>

    <view-orders-modal
      v-if="toggleViewOrders"
      :openDialog="toggleViewOrders"
      :items="selectedOrderOnAction.items"
      :orderDetails="selectedOrderOnAction"
      @close="toggleViewOrders = false"
      @openEditDialog="closeViewAndOpenEditModal"
    />

    <edit-create-order-modal
      v-if="toggleEditCreateDialog"
      :orderPayload="selectedOrderOnAction"
      :openDialog="toggleEditCreateDialog"
      :is-modal-in-editing-mode="true"
      @close="
        toggleEditCreateDialog = false;
        isModalInEditingMode = false;
        selectedOrderOnAction = {};
      "
    />

    <confirmation-modal
      v-if="toggleConfirmationModal"
      :open="toggleConfirmationModal"
      :message="`Confirm you want delete order: (${selectedOrderOnAction.id})`"
      @close="toggleConfirmationModal = false"
      @confirm="toggleConfirmationModal = false"
    >
      <template v-slot:default>
        <span class="text-gray-darken-4" style="font-size: 16px">
          {{ 'Do you want to delete order:' }}
        </span>
        <strong
          :style="{ color: colorScheme.primary, fontSize: '16px' }"
          >{{ ` (${selectedOrderOnAction.id})` }}</strong
        >
      </template>
    </confirmation-modal>
  </v-row>
</template>

<script>
  import CustomCard from '@/shared/components/CustomCard.vue';
  import ViewOrdersModal from '@/components/orders-components/ViewOrdersModal.vue';
  import DataTableWrapper from '@/shared/components/DataTableWrapper.vue';
  import ConfirmationModal from '@/shared/components/ConfirmationModal.vue';
  import EditCreateOrderModal from '@/components/orders-components/EditCreateOrderModal.vue';

  export default {
    name: 'SalesAndOrderPage',
    components: {
      CustomCard,
      ConfirmationModal,
      DataTableWrapper,
      EditCreateOrderModal,
      ViewOrdersModal,
    },
    data() {
      return {
        headers: [
          {
            title: 'Order Id',
            value: 'id',
            type: 'text',
            style: 'font-weight: bold;',
          },
          {
            title: 'Order Date',
            value: 'orderDate',
            type: 'text',
            class: 'font-weight: bold;',
          },
          {
            title: 'Created At',
            value: 'createdAt',
            type: 'text',
            class: 'font-weight: bold;',
          },
          {
            title: 'Total Items',
            value: 'totalItems',
            type: 'text',
            class: 'font-weight: bold;',
          },
          {
            title: 'Total Amount',
            value: 'totalAmount',
            type: 'amount',
            class: 'font-weight: bold;',
          },
          {
            title: 'Actions',
            actions: ['View', 'Delete'],
            type: 'actions',
            class: 'font-weight: bold;',
          },
        ],
        orders: [
          {
            id: 1,
            orderDate: '24/11/2023',
            createdAt: '24/11/2023',
            totalItems: 1,
            totalAmount: 10000.0,
            items: [
              {
                name: 'Iphone 13',
                amount: 123000,
                quantity: 2,
              },
              {
                name: 'Iphone X',
                amount: 123000,
                date: '12 Sep 2023',
                quantity: 3,
              },
            ],
          },
          {
            id: 2,
            orderDate: '24/12/2023',
            createdAt: '24/12/2023',
            totalItems: 2,
            totalAmount: 20000.0,
            items: [],
          },
          {
            id: 3,
            orderDate: '24/13/2023',
            createdAt: '24/13/2023',
            totalItems: 3,
            totalAmount: 30000.0,
            items: [],
          },
          {
            id: 4,
            orderDate: '24/14/2023',
            createdAt: '24/14/2023',
            totalItems: 4,
            totalAmount: 40000.0,
            items: [],
          },
          {
            id: 5,
            orderDate: '24/15/2023',
            createdAt: '24/15/2023',
            totalItems: 5,
            totalAmount: 50000.0,
            items: [],
          },
          {
            id: 6,
            orderDate: '24/16/2023',
            createdAt: '24/16/2023',
            totalItems: 6,
            totalAmount: 60000.0,
            items: [],
          },
        ],
        toggleEditCreateDialog: false,
        toggleViewOrders: false,
        toggleConfirmationModal: false,
        isModalInEditingMode: false,
        selectedOrderOnAction: {},
      };
    },
    computed: {
      AllOrders() {
        return this.orders.map((order) => ({
          ...order,
          id: `JA-${order.id}`,
        }));
      },
    },
    methods: {
      closeViewAndOpenEditModal() {
        this.toggleViewOrders = false;
        this.toggleEditCreateDialog = true;
        this.isModalInEditingMode = true;
      },
      onDeleteOrder(selectedOrder) {
        this.selectedOrderOnAction = selectedOrder;
        this.toggleConfirmationModal = true;
      },
      openViewModal(selectedOrder) {
        this.selectedOrderOnAction = selectedOrder;
        this.toggleViewOrders = true;
      },
    },
  };
</script>

<style lang="scss">
  .custom-datatable {
    .v-data-table__item {
      border: none !important;
    }
  }
  .fw-bold {
    font-weight: bold;
  }

  .icon-container {
    border-radius: 50%;
    background-color: #d0d0d0ba;
    padding: 30px;
  }
</style>
