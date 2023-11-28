<template>
  <v-row class="px-4">
    <v-col cols="12" class="d-flex">
      <h4 :style="{ color: colorScheme.darkGray }">
        {{ 'Inventory' }}
      </h4>

      <v-btn
        class="ml-auto"
        :color="colorScheme.primary"
        style="border-radius: 12px"
        prepend-icon="mdi-plus"
        @click="toggleEditCreateDialog = true"
      >
        {{ 'Add new Item' }}
      </v-btn>
    </v-col>

    <v-col cols="12">
      <custom-card>
        <data-table-wrapper
          title="Inventory"
          :headers="headers"
          :items="AllItems"
          :searchFields="['name', 'id', 'category']"
          :filter-config="{
            type: 'selectable',
            menuItems: ['Food', 'Beverages'],
          }"
          :filters-wrapper-style="{ width: '45%' }"
          @edit="openEditDialog"
          @delete="onDeleteItem"
        />
      </custom-card>
    </v-col>

    <edit-create-item-modal
      v-if="toggleEditCreateDialog"
      :item-payload="selectedItem"
      :is-modal-in-editing-mode="isModalInEditingMode"
      :openDialog="toggleEditCreateDialog"
      @close="
        isModalInEditingMode = false;
        toggleEditCreateDialog = false;
        selectedItem = {};
      "
    />

    <confirmation-modal
      v-if="toggleConfirmationModal"
      :open="toggleConfirmationModal"
      :message="`Confirm you want delete Item: (${selectedItem.id})`"
      @close="toggleConfirmationModal = false"
      @confirm="toggleConfirmationModal = false"
    >
      <template v-slot:default>
        <span class="text-gray-darken-4" style="font-size: 16px">
          {{ 'Do you want to delete Item:' }}
        </span>
        <strong
          :style="{ color: colorScheme.primary, fontSize: '16px' }"
          >{{ ` (${selectedItem.id})` }}</strong
        >
      </template>
    </confirmation-modal>
  </v-row>
</template>

<script>
  import CustomCard from '@/shared/components/CustomCard.vue';
  import DataTableWrapper from '@/shared/components/DataTableWrapper.vue';
  import EditCreateItemModal from '@/components/inventory-components/EditCreateItemModal.vue';
  import ConfirmationModal from '@/shared/components/ConfirmationModal.vue';

  export default {
    name: 'InventoryPage',
    components: {
      CustomCard,
      DataTableWrapper,
      EditCreateItemModal,
      ConfirmationModal,
    },
    data() {
      return {
        headers: [
          {
            title: 'Product Id',
            value: 'id',
            type: 'text',
          },
          {
            title: 'Name',
            value: 'name',
            type: 'text',
            class: 'font-weight: bold;',
          },
          {
            title: 'Description',
            value: 'description',
            type: 'tooltipText',
            style: {
              maxWidth: '200px',
            },
            class: 'font-weight: bold;',
          },
          {
            title: 'Image',
            value: 'imageUrl',
            type: 'image',
            style: {
              height: '60px',
            },
          },
          {
            title: 'Category',
            value: 'category',
            type: 'text',
            class: 'font-weight: bold;',
          },
          {
            title: 'Price',
            value: 'price',
            type: 'amount',
            class: 'font-weight: bold;',
          },
          {
            title: 'Actions',
            actions: ['Edit', 'Delete'],
            type: 'actions',
            class: 'font-weight: bold;',
          },
        ],
        items: [
          {
            id: 1,
            name: 'Item 1',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            category: 'Food',
            createdAt: '24/11/2023',
            price: 10000.0,
            imageUrl: 'clock.png',
          },
          {
            id: 2,
            name: 'Item 2',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            category: 'Beverages',
            createdAt: '24/11/2023',
            price: 20200.0,
            imageUrl: 'clock.png',
          },
          {
            id: 3,
            name: 'Item 3',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            category: 'Food',
            createdAt: '24/11/2023',
            price: 30300.0,
            imageUrl: 'clock.png',
          },
          {
            id: 4,
            name: 'Item 4',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            category: 'Food',
            createdAt: '24/11/2023',
            price: 40400.0,
            imageUrl: 'clock.png',
          },
          {
            id: 5,
            name: 'Item 5',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            category: 'Food',
            createdAt: '24/11/2023',
            price: 50500.0,
            imageUrl: 'clock.png',
          },
          {
            id: 6,
            name: 'Item 6',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            category: 'Food',
            createdAt: '24/11/2023',
            price: 60600.0,
            imageUrl: 'clock.png',
          },
        ],
        toggleEditCreateDialog: false,
        toggleConfirmationModal: false,
        isModalInEditingMode: false,
        selectedItem: {},
      };
    },
    computed: {
      AllItems() {
        return this.items.map((item) => ({
          ...item,
          id: `A-${item.id}`,
        }));
      },
    },
    methods: {
      openEditDialog(selectedItem) {
        this.selectedItem = selectedItem;
        this.toggleEditCreateDialog = true;
        this.isModalInEditingMode = true;
      },
      onDeleteItem(selectedItem) {
        this.selectedItem = selectedItem;
        this.toggleConfirmationModal = true;
      },
    },
  };
</script>

<style lang="scss"></style>
