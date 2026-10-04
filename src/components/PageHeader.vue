<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <div class="d-flex flex-wrap align-center justify-space-between ga-4 mb-6">
    <div>
      <h1 class="text-headline-small font-weight-medium">{{ title }}</h1>
      <p v-if="subtitle" class="text-body-medium text-medium-emphasis">{{ subtitle }}</p>
    </div>
    <div class="d-flex ga-2">
      <slot name="actions" />
    </div>
  </div>
</template>
