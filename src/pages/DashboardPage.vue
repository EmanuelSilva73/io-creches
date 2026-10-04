<script setup>
import { computed, onMounted } from 'vue'

import { useConfigStore } from '@/stores/config'
import { useCriancasStore } from '@/stores/criancas'
import { useMatriculasStore } from '@/stores/matriculas'
import { useResponsaveisStore } from '@/stores/responsaveis'
import { useTurmasStore } from '@/stores/turmas'
import PageHeader from '@/components/PageHeader.vue'
import StatCard from '@/components/StatCard.vue'

const config = useConfigStore()
const criancas = useCriancasStore()
const turmas = useTurmasStore()
const responsaveis = useResponsaveisStore()
const matriculas = useMatriculasStore()

onMounted(() => {
  criancas.fetchAll()
  turmas.fetchAll()
  responsaveis.fetchAll()
  matriculas.fetchAll()
})

const cards = computed(() => [
  {
    title: 'Crianças ativas',
    value: criancas.ativas.length,
    icon: 'mdi-baby-face-outline',
    color: 'primary',
    to: { name: 'criancas' },
  },
  {
    title: 'Turmas',
    value: turmas.items.length,
    icon: 'mdi-google-classroom',
    color: 'secondary',
    to: { name: 'turmas' },
  },
  {
    title: 'Responsáveis',
    value: responsaveis.items.length,
    icon: 'mdi-account-group-outline',
    color: 'accent',
    to: { name: 'responsaveis' },
  },
  {
    title: 'Matrículas pendentes',
    value: matriculas.pendentes.length,
    icon: 'mdi-clipboard-alert-outline',
    color: 'warning',
    to: { name: 'matriculas' },
  },
])

// Ocupação de cada turma (crianças ativas / capacidade)
const ocupacao = computed(() =>
  turmas.items.map((turma) => {
    const total = criancas.porTurma(turma.id).length
    return {
      ...turma,
      total,
      percentual: turma.capacidade ? Math.round((total / turma.capacidade) * 100) : 0,
    }
  }),
)
</script>

<template>
  <PageHeader
    title="Dashboard"
    :subtitle="`${config.config.nomeInstituicao} · Ano letivo ${config.config.anoLetivo}`"
  />

  <v-row>
    <v-col v-for="card in cards" :key="card.title" cols="12" sm="6" lg="3">
      <StatCard v-bind="card" />
    </v-col>
  </v-row>

  <v-row class="mt-2">
    <v-col cols="12" md="7">
      <v-card border flat title="Ocupação das turmas">
        <v-card-text>
          <div v-for="turma in ocupacao" :key="turma.id" class="mb-4">
            <div class="d-flex justify-space-between text-body-medium mb-1">
              <span>{{ turma.nome }}</span>
              <span class="text-medium-emphasis">{{ turma.total }}/{{ turma.capacidade }}</span>
            </div>
            <v-progress-linear
              :model-value="turma.percentual"
              :color="turma.percentual >= 90 ? 'warning' : 'primary'"
              height="8"
              rounded
            />
          </div>
          <p v-if="!ocupacao.length" class="text-medium-emphasis">Nenhuma turma cadastrada.</p>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="5">
      <v-card border flat title="Atalhos">
        <v-list>
          <v-list-item
            prepend-icon="mdi-calendar-check-outline"
            title="Registrar frequência do dia"
            :to="{ name: 'frequencia' }"
          />
          <v-list-item
            prepend-icon="mdi-account-plus-outline"
            title="Cadastrar criança"
            :to="{ name: 'criancas' }"
          />
          <v-list-item
            prepend-icon="mdi-clipboard-text-outline"
            title="Nova matrícula"
            :to="{ name: 'matriculas' }"
          />
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>
