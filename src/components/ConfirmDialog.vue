<script setup>
const model = defineModel({ type: Boolean, default: false })

defineProps({
  title: { type: String, default: 'Confirmar' },
  text: { type: String, default: 'Tem certeza?' },
  confirmText: { type: String, default: 'Excluir' },
  loading: { type: Boolean, default: false },
})

const emit = defineEmits(['confirm'])
</script>

<template>
  <v-dialog v-model="model" max-width="420">
    <v-card :title="title" :text="text">
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="model = false">Cancelar</v-btn>
        <v-btn color="error" variant="flat" :loading="loading" @click="emit('confirm')">
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
