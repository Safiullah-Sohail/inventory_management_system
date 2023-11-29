<template>
  <v-row class="px-4">
    <v-col cols="12" class="d-flex">
      <h4 :style="{ color: colorScheme.darkGray }">
        {{ 'Suppliers' }}
      </h4>

      <v-btn
        class="ml-auto"
        :color="colorScheme.primary"
        style="border-radius: 12px"
        prepend-icon="mdi-plus"
        @click="toggleEditCreateDialog = true"
      >
        {{ 'Add new supplier' }}
      </v-btn>
    </v-col>

    <v-col cols="12">
      <custom-card>
        <data-table-wrapper
          title="Suppliers"
          :headers="headers"
          :items="AllSuppliers"
          :searchFields="['fullName', 'email']"
          :filter-config="{
            type: 'date',
          }"
          @edit="openEditDialog"
          @delete="onDeleteItem"
        />
      </custom-card>
    </v-col>

    <edit-create-supplier-modal
      v-if="toggleEditCreateDialog"
      :supplier-payload="selectedSupplier"
      :is-modal-in-editing-mode="isModalInEditingMode"
      :openDialog="toggleEditCreateDialog"
      @submit="addNewSupplier"
      @edit="updateSupplier"
      @close="
        isModalInEditingMode = false;
        toggleEditCreateDialog = false;
        selectedSupplier = {};
      "
    />

    <confirmation-modal
      v-if="toggleConfirmationModal"
      :open="toggleConfirmationModal"
      :message="`Confirm you want remove Supplier: (${selectedSupplier.id})`"
      @close="
        toggleConfirmationModal = false;
        selectedSupplier = {};
      "
      @confirm="deleteSupplier"
    >
      <template v-slot:default>
        <span class="text-gray-darken-4" style="font-size: 16px">
          {{ 'Do you want to delete Supplier:' }}
        </span>
        <strong
          :style="{ color: colorScheme.primary, fontSize: '16px' }"
          >{{
            ` (${selectedSupplier.fullName}, ${selectedSupplier.email})`
          }}</strong
        >
      </template>
    </confirmation-modal>
  </v-row>
</template>

<script>
  import CustomCard from '@/shared/components/CustomCard.vue';
  import DataTableWrapper from '@/shared/components/DataTableWrapper.vue';
  import EditCreateSupplierModal from '@/components/EditCreateSupplierModal.vue';
  import ConfirmationModal from '@/shared/components/ConfirmationModal.vue';

  export default {
    name: 'InventoryPage',
    components: {
      CustomCard,
      DataTableWrapper,
      EditCreateSupplierModal,
      ConfirmationModal,
    },
    data() {
      return {
        headers: [
          {
            title: 'Full Name',
            value: 'fullName',
            type: 'text',
          },
          {
            title: 'Email',
            value: 'email',
            type: 'text',
          },
          {
            title: 'Phone Number',
            value: 'phoneNumber',
            type: 'text',
          },
          {
            title: 'Created At',
            value: 'createdAt',
            type: 'text',
          },
          {
            title: 'Actions',
            actions: ['Edit', 'Delete'],
            type: 'actions',
            class: 'font-weight: bold;',
          },
        ],
        suppliers: [
          {
            id: 1,
            firstName: 'Muhammad',
            lastName: 'Ali',
            email: 'Muhammad@gmail.com',
            phoneNumber: 100191111,
            createdAt: '24/11/2023',
          },
          {
            id: 2,
            firstName: 'Aftab',
            lastName: 'Sial',
            email: 'Aftab@gmail.com',
            phoneNumber: 200292222,
            createdAt: '24/11/2023',
          },
          {
            id: 3,
            firstName: 'Abdullah',
            lastName: 'Nasir',
            email: 'Abdullah@gmail.com',
            phoneNumber: 300393333,
            createdAt: '24/11/2023',
          },
          {
            id: 4,
            firstName: 'Danish',
            lastName: 'Gondal',
            email: 'Danish@gmail.com',
            phoneNumber: 400494444,
            createdAt: '24/11/2023',
          },
        ],
        toggleEditCreateDialog: false,
        toggleConfirmationModal: false,
        isModalInEditingMode: false,
        selectedSupplier: {},
      };
    },
    computed: {
      AllSuppliers: {
        set(value) {
          this.suppliers = value;
        },
        get() {
          return this.suppliers.map((supplier) => ({
            ...supplier,
            fullName: `${supplier.firstName} ${supplier.lastName}`,
          }));
        },
      },
    },
    methods: {
      openEditDialog(selectedSupplier) {
        this.selectedSupplier = selectedSupplier;
        this.toggleEditCreateDialog = true;
        this.isModalInEditingMode = true;
      },
      onDeleteItem(selectedSupplier) {
        this.selectedSupplier = selectedSupplier;
        this.toggleConfirmationModal = true;
      },
      addNewSupplier(supplier) {
        this.suppliers.push({
          id: this.suppliers[this.suppliers.length - 1].id + 1,
          ...supplier,
        });
        localStorage.setItem(
          'suppliers',
          JSON.stringify(this.AllSuppliers)
        );
      },
      updateSupplier(supplier) {
        this.suppliers = this.suppliers.map((obj) => {
          if (obj.id === supplier.id) {
            return supplier;
          }
          return obj;
        });
        localStorage.setItem(
          'suppliers',
          JSON.stringify(this.AllSuppliers)
        );
      },
      deleteSupplier() {
        this.toggleConfirmationModal = false;
        this.suppliers = this.suppliers.filter(
          (supplier) => supplier.id !== this.selectedSupplier.id
        );
        localStorage.setItem(
          'suppliers',
          JSON.stringify(this.AllSuppliers)
        );

        this.selectedSupplier = {};
      },
    },
    mounted() {
      if (!localStorage.getItem('suppliers')) {
        localStorage.setItem(
          'suppliers',
          JSON.stringify(this.AllSuppliers)
        );
      } else {
        this.AllSuppliers = JSON.parse(
          localStorage.getItem('suppliers')
        );
      }
    },
  };
</script>

<style lang="scss"></style>
