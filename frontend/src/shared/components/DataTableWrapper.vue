<template>
  <v-row>
    <v-col cols="12" class="d-flex">
      <h5
        :style="{
          color: colorScheme.darkGray,
          fontSize: '17px',
        }"
      >
        {{ title }}
      </h5>
      <div
        class="ml-auto d-flex align-center"
        style="gap: 0.3rem; width: 40%"
      >
        <v-text-field
          v-model="searchText"
          variant="outlined"
          density="compact"
          height
          single-line
          hide-details
          :color="colorScheme.primaryText"
          :rounded="30"
          prepend-inner-icon="mdi-magnify"
          flat
          id="Search"
          label="Search"
        />
        <v-btn
          height="35"
          :color="colorScheme.primaryText"
          variant="outlined"
          text="Filter"
          prepend-icon="mdi-calendar"
        >
        </v-btn>
        <v-btn
          height="35"
          :color="colorScheme.primaryText"
          variant="outlined"
          text="Share"
          prepend-icon="mdi-send"
        >
        </v-btn>
      </div>
    </v-col>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="filteredItems"
        :loading="itemsLoading"
        :loading-text="`Loading...!!`"
        :no-data-text="`No ${title} Found...!!`"
        item-key="name"
        items-per-page="6"
        show-select
        class="custom-datatable"
        hover
      >
        <template v-slot:top="{ props }">
          <div
            style="
              width: 100%;
              height: 1px;
              background-color: #e0e0e0;
            "
            v-bind="props"
          ></div>
        </template>
        <template v-slot:headers="{ columns, isSorted, toggleSort }">
          <tr class="text-center">
            <template v-for="column in columns" :key="column.key">
              <td v-if="column.key === 'data-table-select'">
                <v-checkbox
                  v-model="allItemsSelected"
                  hide-details
                  color="grey-darken-1"
                  :ripple="false"
                  @click="selectAllItems"
                ></v-checkbox>
              </td>
              <td v-else>
                <span
                  class="mr-2 cursor-pointer fw-bold"
                  style="cursor: pointer"
                  @click="() => toggleSort(column)"
                  >{{ column.title.toUpperCase() }}</span
                >
                <template v-if="isSorted(column)">
                  <v-icon icon="mdi-filter-variant"></v-icon>
                </template>
                <v-icon
                  v-if="column.removable"
                  icon="mdi-close"
                  @click="() => remove(column.key)"
                ></v-icon>
              </td>
            </template>
          </tr>
        </template>
        <template v-slot:item="{ item }">
          <tr class="text-center">
            <td style="width: 100px">
              <v-checkbox
                v-model="item.isSelected"
                :model-value="item.isSelected"
                hide-details
                color="grey-darken-1"
                :ripple="false"
              ></v-checkbox>
            </td>
            <td v-for="(header, index) in headers" :key="index">
              <span v-if="header.type === 'text'">
                {{ item[header.value] }}
              </span>
              <span v-if="header.type === 'amount'">
                {{ `${CURRENCY_SYMBOL} ${item[header.value]}` }}
              </span>
              <div
                v-if="header.actions"
                class="d-flex justify-center"
                style="gap: 0.4rem"
              >
                <v-btn
                  v-if="header.actions?.includes('View')"
                  text="View"
                  variant="outlined"
                  density="compact"
                  :color="colorScheme.primary"
                  style="border-radius: 8px"
                  @click="
                    toggleViewOrders = true;
                    selectedOrder = item;
                  "
                />
                <v-btn
                  v-if="header.actions?.includes('Delete')"
                  text="Delete"
                  variant="outlined"
                  density="compact"
                  color="red"
                  style="border-radius: 8px"
                  @click="
                    toggleViewOrders = true;
                    selectedOrder = item;
                  "
                />
              </div>
              <span
                v-if="!header.actions && !item[header.value]"
                class="text-grey-darken-1"
              >
                {{ 'N/A' }}
              </span>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-col>

    <view-orders-modal
      :openDialog="toggleViewOrders"
      :items="selectedOrder.items"
      :orderDetails="selectedOrder"
      @close="toggleViewOrders = false"
      @openEditDialog="
        toggleViewOrders = false;
        openEditCreateOrderModal = true;
      "
    />

    <edit-create-order-modal
      v-if="openEditCreateOrderModal"
      :orderPayload="selectedOrder"
      :openDialog="openEditCreateOrderModal"
      :is-modal-in-editing-mode="true"
      @close="
        openEditCreateOrderModal = false;
        selectedOrder = {};
      "
    />
  </v-row>
</template>

<script>
  import { CURRENCY_SYMBOL } from '@/enums';
  import ViewOrdersModal from '@/components/orders-components/ViewOrdersModal.vue';
  import EditCreateOrderModal from '@/components/orders-components/EditCreateOrderModal.vue';

  export default {
    name: 'CustomDataTable',
    components: {
      ViewOrdersModal,
      EditCreateOrderModal,
    },
    props: {
      title: {
        type: String,
        default: '',
      },
      headers: {
        type: Array,
        default: [],
      },
      items: {
        type: Array,
        default: [],
      },
      searchFields: {
        type: Array,
        default: [],
      },
    },
    data() {
      return {
        CURRENCY_SYMBOL,
        searchText: '',
        itemsLoading: false,
        allItemsSelected: false,
        toggleViewOrders: false,
        openEditCreateOrderModal: false,
        selectedOrder: {},
      };
    },
    computed: {
      filteredItems() {
        if (this.searchText) {
          const textValue = this.searchText.toLowerCase();
          const filteredObj = this.items.filter((item) => {
            let isFound = false;
            this.searchFields.forEach((field) => {
              if (item[field].toLowerCase().indexOf(textValue) > -1) {
                isFound = true;
              }
            });
            return isFound;
          });
          const list = Object.keys(filteredObj).map((key) => ({
            ...filteredObj[key],
          }));
          return list;
        }

        return this.items;
      },
    },
    methods: {
      selectAllItems() {
        this.items.forEach((item) => {
          item.isSelected = !this.allItemsSelected;
        });
      },
    },
  };
</script>

<style></style>
