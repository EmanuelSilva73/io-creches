<script setup>
import { ref } from 'vue'

// Diálogo genérico com formulário validado; o conteúdo vem pelo slot padrão
const model = defineModel({ type: Boolean, default: false })

defineProps({
  title: { type: String, required: true },
  loading: { type: Boolean, default: false },
  maxWidth: { type: [Number, String], default: 640 },
})

const emit = defineEmits(['submit'])

const form = ref(null)

async function submit() {
  const { valid } = await form.value.validate()
  if (valid) emit('submit')
}
</script>

<template>
  <v-dialog v-model="model" :max-width="maxWidth" persistent scrollable>
    <v-card :title="title">
      <v-divider />
      <v-card-text>
        <v-form ref="form" @submit.prevent="submit">
          <slot />
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="model = false">Cancelar</v-btn>
        <v-btn color="primary" variant="flat" :loading="loading" @click="submit">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
