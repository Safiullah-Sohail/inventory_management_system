<template>
  <v-card style="border-radius: 12px; padding: 16px" v-bind="$attrs">
    <v-card-title
      v-if="$slots['card-title']"
      class="px-2"
      v-bind="cardTitleProps"
    >
      <slot name="card-title"></slot>
    </v-card-title>
    <v-card-text class="pa-2">
      <slot>
        <!-- Display a message when there is no content -->
        <div v-if="!$slots.default">This is custom card</div>
      </slot>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'CustomCard',
    props: {
      cardTitleProps: {
        type: Object,
        default: {},
      },
    },
  };
</script>

<style></style>
