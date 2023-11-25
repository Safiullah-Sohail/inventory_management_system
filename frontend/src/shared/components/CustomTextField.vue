<template>
  <v-text-field
    :id="id"
    :bg-color="colorScheme.textField"
    :rounded="30"
    variant="solo"
    density="compact"
    hide-details="auto"
    flat
    v-bind="$attrs"
  />
</template>

<script>
  export default {
    name: 'CustomTextField',
    props: {
      id: {
        type: String,
        default: '',
      },
    },
  };
</script>

<style></style>
