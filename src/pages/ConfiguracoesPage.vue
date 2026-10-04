<script setup>
import { useAppTheme } from '@/composables/useAppTheme'
import { useConfigStore } from '@/stores/config'
import PageHeader from '@/components/PageHeader.vue'

const configStore = useConfigStore()
const { isDark, setTheme } = useAppTheme()
</script>

<template>
  <PageHeader title="Configurações" subtitle="Preferências gerais do sistema" />

  <v-row>
    <v-col cols="12" md="7">
      <v-card border flat title="Instituição">
        <v-card-text>
          <v-text-field
            v-model="configStore.config.nomeInstituicao"
            label="Nome da instituição"
            class="mb-2"
          />
          <v-text-field v-model="configStore.config.municipio" label="Município" class="mb-2" />
          <v-text-field
            v-model.number="configStore.config.anoLetivo"
            label="Ano letivo atual"
            type="number"
          />
          <p class="text-body-small text-medium-emphasis">
            As configurações ficam salvas neste navegador até a integração com o backend.
          </p>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="5">
      <v-card border flat title="Aparência">
        <v-card-text>
          <v-btn-toggle
            :model-value="isDark ? 'dark' : 'light'"
            mandatory
            color="primary"
            variant="outlined"
            divided
            @update:model-value="setTheme"
          >
            <v-btn value="light" prepend-icon="mdi-weather-sunny">Claro</v-btn>
            <v-btn value="dark" prepend-icon="mdi-weather-night">Escuro</v-btn>
          </v-btn-toggle>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
