<script setup>
defineProps({
  title: { type: String, required: true },
  value: { type: [Number, String], required: true },
  icon: { type: String, required: true },
  color: { type: String, default: 'primary' },
  to: { type: Object, default: null },
})
</script>

<template>
  <v-card :to="to" border flat>
    <v-card-text class="d-flex align-center ga-4">
      <v-avatar :color="color" variant="tonal" size="52" rounded="lg">
        <v-icon :icon="icon" size="28" />
      </v-avatar>
      <div>
        <div class="text-body-medium text-medium-emphasis">{{ title }}</div>
        <div class="text-headline-small font-weight-bold">{{ value }}</div>
      </div>
    </v-card-text>
  </v-card>
</template>
