<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { email as emailRule, required } from '@/utils/rules'
import AppLogo from '@/components/AppLogo.vue'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const form = ref(null)
const email = ref('')
const senha = ref('')
const showPassword = ref(false)
const loading = ref(false)

async function submit() {
  const { valid } = await form.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await auth.login({ email: email.value, senha: senha.value })
    router.push(route.query.redirect || { name: 'dashboard' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="100%" max-width="420" border flat class="pa-4">
      <v-card-item>
        <AppLogo class="mb-4" />
        <v-card-title>Entrar</v-card-title>
        <v-card-subtitle>Acesse o sistema de gestão de creches</v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <v-alert type="info" variant="tonal" density="compact" class="mb-4">
          Login provisório: qualquer e-mail e senha são aceitos.
        </v-alert>

        <v-form ref="form" @submit.prevent="submit">
          <v-text-field
            v-model="email"
            label="E-mail"
            type="email"
            prepend-inner-icon="mdi-email-outline"
            autocomplete="username"
            :rules="[required, emailRule]"
            class="mb-2"
          />
          <v-text-field
            v-model="senha"
            label="Senha"
            :type="showPassword ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            autocomplete="current-password"
            :rules="[required]"
            @click:append-inner="showPassword = !showPassword"
          />
          <v-btn type="submit" color="primary" size="large" block :loading="loading" class="mt-2">
            Entrar
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
