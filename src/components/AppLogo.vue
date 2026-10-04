<script setup>
defineProps({
  compact: { type: Boolean, default: false },
})
</script>

<template>
  <div class="d-flex align-center ga-2">
    <v-avatar color="primary" size="36" rounded="lg">
      <v-icon icon="mdi-home-heart" />
    </v-avatar>
    <div v-if="!compact">
      <div class="text-title-medium font-weight-bold">io-creches</div>
      <div class="text-body-small text-medium-emphasis">Gestão de creches</div>
    </div>
  </div>
</template>
