<template>
  <v-dialog
    :model-value="open"
    transition="dialog-bottom-transition"
    max-width="500px"
    persistent
  >
    <custom-card>
      <v-row>
        <v-col cols="12" class="d-flex">
          <h4 :style="{ color: colorScheme.secondaryText }">
            {{ title }}
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

        <v-col cols="12">
          <!-- <span class="text-grey-darken-4">{{ message }}</span> -->
          <slot />
        </v-col>

        <v-col cols="12" class="d-flex justify-end" style="gap: 0.4rem;">
          <v-btn
            id="confirmation-modal_cancel-btn"
            variant="outlined"
            style="border-radius: 12px"
            :color="colorScheme.darkGray"
            class="mb-2"
            @click="onClick(false)"
          >
            Cancel
          </v-btn>
          <v-btn
            id="confirmation-modal_confirm-btn"
            class="mb-2"
            variant="elevated"
            style="border-radius: 12px"
            :color="colorScheme.primary"
            :disabled="disableConfirmButton"
            @click="onClick(true)"
          >
            Confirm
          </v-btn>
        </v-col>
      </v-row>
    </custom-card>
  </v-dialog>
</template>

<script>
  import CustomCard from './CustomCard.vue';

  export default {
    name: 'ConfirmationModal',
    components: {
      CustomCard,
    },
    props: {
      open: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: 'Confirmation Modal',
      },
      message: {
        type: String,
        default: 'Are you sure you want to perform action?',
      },
      color: {
        type: String,
        default: 'primary',
      },
      disableConfirmButton: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {};
    },
    methods: {
      onClick(isConfirmed) {
        if (isConfirmed) {
          this.$emit('confirm');
        } else {
          this.$emit('close');
        }
      },
    },
  };
</script>

<style></style>
