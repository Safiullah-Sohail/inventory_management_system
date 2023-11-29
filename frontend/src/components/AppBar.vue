<template>
  <div>
    <v-navigation-drawer
      v-model:rail="navigationDrawerClosed"
      expand-on-hover
      disable-resize-watcher
      permanent
      rail
      class="navigation-drawer"
    >
      <v-list>
        <v-list-item
          class="header-text"
          :prepend-avatar="require('../assets/Logo.png')"
        >
          <h1 style="font-size: 20px">IMS</h1>
        </v-list-item>
      </v-list>
      <v-list
        v-model:selected="selectedTabs"
        density="compact"
        nav
        class="mt-9 navigation-list"
        :class="{ 'mx-5': !navigationDrawerClosed }"
        style="flex: 1; overflow-y: none"
        :mandatory="true"
      >
        <v-list-item
          v-for="(tab, index) in sidebarTabs"
          :variant="tab.title === 'Logout' ? 'text' : 'elevated'"
          elevation="0"
          nav
          :value="index"
          :title="tab.title"
          :base-color="
            tab.title === 'Logout' ? colorScheme.error : ''
          "
          :color="
            tab.title === 'Logout'
              ? colorScheme.error
              : colorScheme.primary
          "
          :key="index"
          style="border-radius: 12px"
        >
          <template v-slot:prepend>
            <v-avatar rounded="0">
              <v-img
                v-if="!tab.mdiIcon"
                :src="
                  require(`../assets/icons/${
                    tab.isSelected ? tab.selectedImage : tab.iconImage
                  }`)
                "
                max-width="20"
              />
              <v-icon
                v-else
                :icon="tab.mdiIcon"
                size="22"
                :color="colorScheme.error"
              />
            </v-avatar>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="app-bar" height="88" elevation="3">
      <div class="d-block w-100">
        <div class="d-flex px-5 pb-2" style="align-items: center">
          <h4 :style="{ color: colorScheme.darkGray }">
            {{ getTitle(this) }}
          </h4>

          <div style="margin-left: auto">
            <v-btn
              icon="mdi-bell"
              class="mr-2"
              :color="colorScheme.primary"
            >
            </v-btn>
            <v-btn icon size="38" class="mr-3">
              <v-avatar :color="colorScheme.primary" size="38">
                <v-icon size="large" :color="colorScheme.lightGray">
                  mdi-account-circle-outline
                </v-icon>
              </v-avatar>
            </v-btn>
          </div>
        </div>

        <v-divider></v-divider>

        <div class="px-5">
          <v-breadcrumbs class="pa-0">
            <v-breadcrumbs-item
              v-for="(route, index) in routeHistory"
              :key="index"
              class="pa-0"
              :disabled="route.disabled"
            >
              <a
                :href="route.href"
                class="text-decoration-none text-main"
              >
                <v-icon
                  v-if="route.icon"
                  large
                  :color="colorScheme.primary"
                  :icon="route.icon"
                />
                <span v-else>{{ route.title }}</span>
              </a>
              <v-breadcrumbs-divider
                v-if="index + 1 !== routeHistory.length"
                class="px-1"
                :style="{ color: colorScheme.primary }"
              />
            </v-breadcrumbs-item>
          </v-breadcrumbs>
        </div>
      </div>
    </v-app-bar>

    <confirmation-modal
      :open="toggleConfirmationModal"
      @confirm="onLogoutTabClick"
      @close="toggleConfirmationModal = false"
    >
      <span>Are you sure you want to Logout?</span>
    </confirmation-modal>
  </div>
</template>

<script>
  import ConfirmationModal from '@/shared/components/ConfirmationModal.vue';
  export default {
    name: 'AppBar',
    components: {
      ConfirmationModal,
    },
    data() {
      return {
        sidebarTabs: [
          {
            iconImage: 'dashboard-unselected.png',
            selectedImage: 'dashboard-selected.png',
            title: 'Dashboard',
            value: 'dashboard',
            href: '/dashboard',
            isSelected: true,
          },
          {
            iconImage: 'Order&Sales.png',
            selectedImage: 'Order&SalesSelected.png',
            title: 'Outgoing Orders',
            value: 'outgoingOrders',
            href: '/outgoing-orders',
            isSelected: false,
          },
          {
            iconImage: 'Suppliers.png',
            selectedImage: 'SuppliersSelected.png',
            title: 'Suppliers',
            value: 'suppliers',
            href: '/suppliers',
            isSelected: false,
          },
          {
            iconImage: 'Inventory.png',
            selectedImage: 'InventorySelected.png',
            title: 'Inventory',
            value: 'inventory',
            href: '/inventory',
            isSelected: false,
          },
          {
            iconImage: 'Settings.png',
            selectedImage: 'SettingsSelected.png',
            title: 'Settings',
            value: 'settings',
            href: '/settings',
            isSelected: false,
          },
          {
            mdiIcon: 'mdi-logout',
            title: 'Logout',
            value: 'logout',
            isSelected: false,
          },
        ],
        selectedTabs: [0],
        navigationDrawerClosed: true,
        toggleConfirmationModal: false,
      };
    },
    watch: {
      selectedTabs(newValue, oldValue) {
        if (newValue[0] !== oldValue[0]) {
          const tab = this.sidebarTabs[newValue[0]];
          tab.isSelected = true;
          this.sidebarTabs[oldValue[0]].isSelected = false;

          if (tab.href) {
            this.$router.push(tab.href);
            localStorage.setItem('current-tab-index', newValue[0]);
          }
          // Only Logout Tab is only tab without any href value
          else {
            this.selectedTabs = oldValue;
            this.toggleConfirmationModal = true;
          }
        }
      },
    },
    computed: {
      routeHistory() {
        let list = [{ icon: 'mdi-home', href: '/dashboard' }];
        const selectedTabIndex = this.selectedTabs[0];
        list = [
          ...list,
          ...this.sidebarTabs
            .filter(
              (tab, index) =>
                index !== 0 &&
                tab.href &&
                index === this.selectedTabs[0]
            )
            .map((tab) => ({
              ...tab,
              disabled:
                tab.title ===
                this.sidebarTabs[selectedTabIndex].title,
            })),
        ];
        return list;
      },
    },
    methods: {
      onLogoutTabClick() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.$router.push({ name: 'login' });
        this.$toast.success('Logout Successfully!!');
      },
    },
    mounted() {
      const index = localStorage.getItem('current-tab-index');
      this.selectedTabs = [+index];
    },
  };
</script>

<style lang="scss" scoped>
  .header-text {
    .v-list-item__content {
      .v-list-item-title {
        font-weight: bold;
      }
    }
  }

  .navigation-list {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 64px - 36px);

    .v-list-item:last-child {
      margin-top: auto;
    }
  }
</style>
