<template>
  <v-row class="pa-2">
    <!-- Top 3 cards START -->
    <v-col cols="12" md="4" sm="4">
      <custom-card>
        <v-row>
          <v-col cols="2">
            <div class="graph-container">
              <graph />
            </div>
          </v-col>
          <v-col
            cols="10"
            class="d-flex justify-end"
            :class="$vuetify.display.xs ? 'pr-0' : ''"
          >
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  variant="text"
                  class="drop-down-btn"
                  density="compact"
                  v-bind="props"
                  color="grey-lighten-1"
                  rounded="20"
                  append-icon="mdi-arrow-down"
                >
                  {{ incomeFilters || 'This Week' }}
                </v-btn>
              </template>

              <v-list style="border-radius: 12px" elevation="2">
                <v-list-item
                  v-for="(item, index) in ['Monday', 'Tuesday']"
                  :key="index"
                  density="compact"
                  :base-color="colorScheme.primary"
                  variant="plain"
                  style="cursor: pointer"
                  @click="incomeFilters = item"
                >
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
        <v-row class="mt-4">
          <v-col cols="12" md="6" class="d-flex flex-column">
            <span :class="`text-grey-darken-1`">Total Income</span>
            <h4 class="text-grey-darken-3">
              {{ `${CURRENCY_SYMBOL}. 400,000.00` }}
            </h4>
          </v-col>

          <v-col cols="12" md="6" class="d-flex flex-column">
            <span :class="`text-grey-darken-1`">Volume</span>
            <div class="d-flex align-center">
              <h4 class="text-grey-darken-3">
                {{ `450` }}
              </h4>
              <span class="text-green font-12 ml-2">+20.00%</span>
            </div>
          </v-col>
        </v-row>
      </custom-card>
    </v-col>
    <v-col cols="12" md="4" sm="4">
      <custom-card>
        <v-row>
          <v-col cols="2">
            <div
              class="graph-container"
              style="background-color: #ffcc9129"
            >
              <sales-and-order />
            </div>
          </v-col>
          <v-col
            cols="10"
            class="d-flex justify-end"
            :class="$vuetify.display.xs ? 'pr-0' : ''"
          >
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  variant="text"
                  class="drop-down-btn"
                  density="compact"
                  v-bind="props"
                  color="grey-lighten-1"
                  rounded="20"
                  append-icon="mdi-arrow-down"
                >
                  {{ ordersFilterDay || 'This Week' }}
                </v-btn>
              </template>

              <v-list style="border-radius: 12px" elevation="2">
                <v-list-item
                  v-for="(item, index) in ['Monday', 'Tuesday']"
                  :key="index"
                  density="compact"
                  :base-color="colorScheme.primary"
                  variant="plain"
                  style="cursor: pointer"
                  @click="ordersFilterDay = item"
                >
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
        <v-row class="mt-4">
          <v-col cols="6" md="4" class="d-flex flex-column">
            <span :class="`text-grey-darken-1`">All Orders</span>
            <h4 class="text-grey-darken-3">
              {{ `450` }}
            </h4>
          </v-col>

          <v-col cols="6" md="4" class="d-flex flex-column">
            <span :class="`text-grey-darken-1`">Incoming</span>
            <div class="d-flex align-center">
              <h4 class="text-grey-darken-3">
                {{ `5` }}
              </h4>
            </div>
          </v-col>

          <v-col cols="4" md="4" class="d-flex flex-column">
            <span :class="`text-grey-darken-1`">Outgoing</span>
            <div class="d-flex align-center">
              <h4 class="text-grey-darken-3">
                {{ `455` }}
              </h4>
            </div>
          </v-col>
        </v-row>
      </custom-card>
    </v-col>
    <v-col cols="12" md="4" sm="4">
      <custom-card>
        <v-row>
          <v-col cols="2">
            <div
              class="graph-container"
              style="background-color: #d2e7fb"
            >
              <v-icon>mdi-plus-circle-multiple-outline</v-icon>
            </div>
          </v-col>
          <v-col
            cols="10"
            style="margin-left: auto"
            class="d-flex justify-end"
          >
            Quick Actions
          </v-col>
        </v-row>
        <v-row class="mt-4">
          <v-col cols="12" md="6">
            <v-btn
              class="drop-down-btn px-3"
              height="30"
              variant="tonal"
              :color="colorScheme.primary"
            >
              Create Order
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            md="6"
            :class="$vuetify.display.xs ? 'pt-0' : ''"
          >
            <v-btn
              class="drop-down-btn px-3"
              :class="$vuetify.display.smAndDown ? '' : 'float-right'"
              height="30"
              variant="tonal"
              :color="colorScheme.primary"
            >
              Add Item
            </v-btn>
          </v-col>
        </v-row>
      </custom-card>
    </v-col>
    <!-- Top 3 cards END -->

    <!-- Second row cards START -->
    <v-col cols="12" md="4" sm="4">
      <custom-card>
        <v-row>
          <v-col cols="6">
            <span style="font-size: 16px; font-weight: 600"
              >Stock Report</span
            >
          </v-col>
          <v-col
            cols="6"
            class="d-flex justify-end"
            :class="$vuetify.display.xs ? 'pr-0' : ''"
          >
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  variant="text"
                  class="drop-down-btn"
                  density="compact"
                  v-bind="props"
                  color="grey-lighten-1"
                  rounded="20"
                  append-icon="mdi-arrow-down"
                >
                  {{ ordersFilterDay || 'This Week' }}
                </v-btn>
              </template>

              <v-list style="border-radius: 12px" elevation="2">
                <v-list-item
                  v-for="(item, index) in ['Monday', 'Tuesday']"
                  :key="index"
                  density="compact"
                  :base-color="colorScheme.primary"
                  variant="plain"
                  style="cursor: pointer"
                  @click="ordersFilterDay = item"
                >
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col cols="4" class="d-flex align-center">
            <div
              class="circle"
              :style="{ 'background-color': colorScheme.primary }"
            />
            <span
              style="
                font-size: 11px;
                font-weight: 400;
                color: #a6a8b1;
              "
              class="ml-1"
            >
              Stock In
            </span>
          </v-col>
          <v-col cols="4" class="d-flex align-center">
            <div
              class="circle"
              :style="{ 'background-color': '#97A5EB' }"
            />
            <span
              style="
                font-size: 11px;
                font-weight: 400;
                color: #a6a8b1;
              "
              class="ml-1"
            >
              Stock Out
            </span>
          </v-col>
          <v-col cols="4" class="d-flex align-center">
            <div
              class="circle"
              :style="{ 'background-color': '#FFCC91' }"
            />
            <span
              style="
                font-size: 11px;
                font-weight: 400;
                color: #a6a8b1;
              "
              class="ml-1"
            >
              Total
            </span>
          </v-col>
          <v-col cols="12">
            <Doughnut :data="data.datasets[0].data.length > 0 ? data : emptyData" :options="options" />
          </v-col>
        </v-row>
      </custom-card>
    </v-col>
    <v-col
      cols="12"
      md="4"
      sm="4"
      class="d-flex flex-column"
      style="gap: 2.1em"
    >
      <div style="flex: 1">
        <custom-card
          :cardTextProps="{
            style: {
              display: 'flex',
              'flex-direction': 'column',
              'justify-content': 'space-between',
              height: '100%',
            },
          }"
          :style="{
            'background-color': colorScheme.primary,
            height: '100%',
          }"
        >
          <v-row>
            <v-col cols="2">
              <div
                class="graph-container"
                style="background-color: #ffffff29"
              >
                <inventory />
              </div>
            </v-col>
          </v-row>
          <v-row class="mt-4">
            <v-col cols="6" md="6" class="d-flex flex-column">
              <span :class="`text-white`">All Items</span>
              <h4 class="text-white">
                {{ `45` }}
              </h4>
            </v-col>

            <v-col cols="6" md="6" class="d-flex flex-column">
              <span :class="`text-white`">Active</span>
              <div class="d-flex align-center">
                <h4 class="text-white">
                  {{ `32` }}
                </h4>
                <span class="font-12 ml-2" style="color: #dbdeee"
                  >+24%</span
                >
              </div>
            </v-col>
          </v-row>
        </custom-card>
      </div>
      <div style="flex: 1">
        <custom-card
          style="height: 100%"
          :cardTextProps="{
            style: {
              display: 'flex',
              'flex-direction': 'column',
              'justify-content': 'space-between',
              height: '100%',
            },
          }"
        >
          <v-row>
            <v-col cols="2">
              <div
                class="graph-container"
                style="background-color: #ffcc9129"
              >
                <cart />
              </div>
            </v-col>
            <v-col
              cols="10"
              class="d-flex justify-end"
              :class="$vuetify.display.xs ? 'pr-0' : ''"
            >
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    variant="text"
                    class="drop-down-btn"
                    density="compact"
                    v-bind="props"
                    color="grey-lighten-1"
                    rounded="20"
                    append-icon="mdi-arrow-down"
                  >
                    {{ incomeFilters || 'This Week' }}
                  </v-btn>
                </template>

                <v-list style="border-radius: 12px" elevation="2">
                  <v-list-item
                    v-for="(item, index) in ['Monday', 'Tuesday']"
                    :key="index"
                    density="compact"
                    :base-color="colorScheme.primary"
                    variant="plain"
                    style="cursor: pointer"
                    @click="incomeFilters = item"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
          <v-row class="mt-4">
            <v-col cols="12" md="6" class="d-flex flex-column">
              <span :class="`text-red`">Abandoned Cart</span>
              <div class="d-flex align-center">
                <h4 class="text-grey-darken-3">
                  {{ '20%' }}
                </h4>
                <span class="text-green font-12 ml-2">+00.00%</span>
              </div>
            </v-col>

            <v-col cols="12" md="6" class="d-flex flex-column">
              <span :class="`text-grey-darken-1`">Customers</span>
              <h4 class="text-grey-darken-3">
                {{ `30` }}
              </h4>
            </v-col>
          </v-row>
        </custom-card>
      </div>
    </v-col>
    <v-col cols="12" md="4" sm="4">
      <custom-card style="height: 100%">
        <v-row>
          <v-col cols="12">
            <span style="font-size: 16px; font-weight: 600">
              Fast Moving Items
            </span>
          </v-col>
          <v-col
            cols="12"
            v-for="(item, index) in fastMovingItems"
            :key="index"
          >
            <v-row class="align-center">
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
                md="6"
                sm="10"
                class="d-flex flex-column"
                :class="$vuetify.display.smAndDown ? 'pb-0' : ''"
              >
                <span>{{ item.name }}</span>
                <span
                  :class="$vuetify.display.smAndDown ? '' : 'mt-2'"
                  style="font-weight: 700"
                >
                  {{ `${CURRENCY_SYMBOL} ${item.price}` }}
                </span>
              </v-col>
              <v-col
                cols="12"
                md="4"
                sm="12"
                class="d-flex align-end"
                :class="
                  $vuetify.display.smAndDown
                    ? 'flex-row pt-0 justify-end mt-2'
                    : 'flex-column'
                "
                :style="$vuetify.display.sm ? 'gap: 0.2em' : ''"
              >
                <span class="text-grey-darken-1 font-12">
                  {{ item.date }}
                </span>
                <v-chip
                  class="mt-2 px-0"
                  :color="
                    item.status === 'Pending'
                      ? '#e84a4a'
                      : '#07a86db3'
                  "
                  size="x-small"
                  rounded
                  style="border-radius: 8px"
                >
                  {{ item.status }}
                </v-chip>
              </v-col>
              <v-col
                cols="12"
                class="py-1"
                v-if="index + 1 !== fastMovingItems.length"
              >
                <v-divider />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </custom-card>
    </v-col>
    <!-- Second row cards END -->

    <v-col cols="12">
      <custom-card>
        <v-row>
          <v-col cols="12" md="4" sm="4">
            <span style="font-size: 16px; font-weight: 600">
              {{ 'Products Price Changes' }}
            </span>
          </v-col>
          <v-col cols="6" md="4" sm="4" class="pt-2">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-chip
                  variant="tonal"
                  :color="colorScheme.primary"
                  :append-icon="$vuetify.display.xs? '' : 'mdi-arrow-down'"
                  class="px-1"
                  style="border-radius: 8px"
                  :style="
                    $vuetify.display.xs
                      ? { width: '100%' }
                      : { width: '50%' }
                  "
                  v-bind="props"
                >
                  {{ ordersFilterDay || 'Iphone 13' }}
                </v-chip>
              </template>

              <v-list style="border-radius: 12px" elevation="2">
                <v-list-item
                  v-for="(item, index) in ['Iphone 13', 'Iphone X']"
                  :key="index"
                  density="compact"
                  :base-color="colorScheme.primary"
                  variant="plain"
                  style="cursor: pointer"
                  @click="ordersFilterDay = item"
                >
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col
            cols="6"
            md="4"
            sm="4"
            class="d-flex justify-end"
            :class="$vuetify.display.xs ? 'pr-0' : ''"
          >
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  variant="text"
                  class="drop-down-btn"
                  density="compact"
                  v-bind="props"
                  color="grey-lighten-1"
                  rounded="20"
                  append-icon="mdi-arrow-down"
                >
                  {{ ordersFilterDay || 'This Week' }}
                </v-btn>
              </template>

              <v-list style="border-radius: 12px" elevation="2">
                <v-list-item
                  v-for="(item, index) in ['Monday', 'Tuesday']"
                  :key="index"
                  density="compact"
                  :base-color="colorScheme.primary"
                  variant="plain"
                  style="cursor: pointer"
                  @click="ordersFilterDay = item"
                >
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col cols="12">
            <Bar :data="barChartData" :options="options" />
          </v-col>
        </v-row>
      </custom-card>
    </v-col>
  </v-row>
</template>

<script>
  import { CURRENCY_SYMBOL } from '@/enums';
  import CustomCard from '@/shared/components/CustomCard.vue';
  import Graph from '@/shared/icons/Graph.vue';
  import SalesAndOrder from '@/shared/icons/SalesAndOrder.vue';
  import Inventory from '@/shared/icons/Inventory.vue';
  import Cart from '@/shared/icons/Cart.vue';

  import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    BarElement,
    CategoryScale,
    LinearScale,
    ChartData,
  } from 'chart.js';
  import { Doughnut, Bar } from 'vue-chartjs';

  ChartJS.register(ArcElement, Tooltip, Legend);
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  );

  export default {
    name: 'DashBoardPage',
    components: {
      CustomCard,
      Graph,
      SalesAndOrder,
      Inventory,
      Cart,
      Doughnut,
      Bar,
    },
    data() {
      return {
        CURRENCY_SYMBOL,
        ordersFilterDay: '',
        incomeFilters: '',
        fastMovingItems: [
          {
            name: 'Iphone 13',
            price: '123,000',
            date: '12 Sep 2023',
            status: 'Pending',
          },
          {
            name: 'Iphone X',
            price: '123,000',
            date: '12 Sep 2023',
            status: 'Completed',
          },
        ],
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
        emptyData: {
          datasets: [
            {
              label: 'Empty',
              backgroundColor: ['#EEF0FA'],
              data: [10],
            },
          ],
        },
        data: {
          datasets: [
            {
              backgroundColor: ['#5570F1', '#97A5EB', '#FFCC91'],
              data: [80, 30, 45],
            },
          ],
        },
        barChartData: {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
          ],
          datasets: [
            {
              label: 'Iphone 13',
              backgroundColor: '#97A5EB',
              data: [10, 20, 25, 14, 30, 24, 12, 40],
            },
          ],
        },
      };
    },
  };
</script>

<style lang="scss" scoped>
  * {
    flex-wrap: wrap;
  }
  .graph-container {
    background-color: #5570f11f;
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  }

  .drop-down-btn {
    font-size: 3px;
    text-transform: capitalize;
  }

  .font-12 {
    font-size: 12px;
    font-weight: 500;
  }

  .circle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
</style>
