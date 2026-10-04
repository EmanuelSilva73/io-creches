<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

import { menuItems } from '@/data/menu'
import { useAuthStore } from '@/stores/auth'
import { useNotifyStore } from '@/stores/notify'
import { useAppTheme } from '@/composables/useAppTheme'
import AppLogo from '@/components/AppLogo.vue'

const { mobile } = useDisplay()
const drawer = ref(!mobile.value)
const rail = ref(false)

const router = useRouter()
const auth = useAuthStore()
const notify = useNotifyStore()
const { isDark, toggleTheme } = useAppTheme()

function logout() {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <v-navigation-drawer v-model="drawer" :rail="rail && !mobile">
    <div class="pa-4">
      <AppLogo :compact="rail && !mobile" />
    </div>

    <v-divider />

    <v-list nav density="comfortable" color="primary">
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
      />
    </v-list>
  </v-navigation-drawer>

  <v-app-bar flat border="b">
    <v-app-bar-nav-icon @click="mobile ? (drawer = !drawer) : (rail = !rail)" />

    <v-app-bar-title>{{ $route.meta.title }}</v-app-bar-title>

    <template #append>
      <v-btn
        :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        :title="isDark ? 'Tema claro' : 'Tema escuro'"
        @click="toggleTheme"
      />

      <v-menu>
        <template #activator="{ props }">
          <v-btn v-bind="props" icon="mdi-account-circle-outline" title="Conta" />
        </template>

        <v-list density="compact" min-width="200">
          <v-list-item :title="auth.user?.nome" :subtitle="auth.user?.email" />
          <v-divider />
          <v-list-item prepend-icon="mdi-logout" title="Sair" @click="logout" />
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>

  <v-main>
    <v-container fluid class="pa-4 pa-md-6">
      <slot />
    </v-container>
  </v-main>

  <v-snackbar v-model="notify.show" :color="notify.color" timeout="3000" location="bottom right">
    {{ notify.text }}
  </v-snackbar>
</template>
