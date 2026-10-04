<script setup>
import { computed, onMounted, ref, watch } from 'vue'

import { useCriancasStore } from '@/stores/criancas'
import { useFrequenciaStore } from '@/stores/frequencia'
import { useNotifyStore } from '@/stores/notify'
import { useTurmasStore } from '@/stores/turmas'
import { todayISO } from '@/utils/format'
import PageHeader from '@/components/PageHeader.vue'

const turmas = useTurmasStore()
const criancas = useCriancasStore()
const frequencia = useFrequenciaStore()
const { notify } = useNotifyStore()

const turmaId = ref(null)
const data = ref(todayISO())
const presencas = ref({})

onMounted(async () => {
  await Promise.all([turmas.fetchAll(), criancas.fetchAll()])
  turmaId.value ??= turmas.items[0]?.id ?? null
})

const lista = computed(() => (turmaId.value ? criancas.porTurma(turmaId.value) : []))
const totalPresentes = computed(() => lista.value.filter((c) => presencas.value[c.id]).length)

// Ao trocar turma ou data, carrega os registros já salvos
watch([turmaId, data], async ([turma, dia]) => {
  if (!turma || !dia) return
  const registros = await frequencia.carregar(turma, dia)
  presencas.value = Object.fromEntries(
    lista.value.map((crianca) => [
      crianca.id,
      registros.find((r) => r.criancaId === crianca.id)?.presente ?? false,
    ]),
  )
})

function marcarTodos(valor) {
  lista.value.forEach((crianca) => (presencas.value[crianca.id] = valor))
}

async function salvar() {
  await frequencia.salvar(turmaId.value, data.value, presencas.value)
  notify('Frequência salva com sucesso.')
}
</script>

<template>
  <PageHeader title="Frequência" subtitle="Registro diário de presença por turma" />

  <v-card border flat>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-select
            v-model="turmaId"
            label="Turma"
            :items="turmas.items"
            item-title="nome"
            item-value="id"
            hide-details
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field v-model="data" label="Data" type="date" hide-details />
        </v-col>
        <v-col cols="12" md="5" class="d-flex align-center justify-md-end ga-2">
          <v-btn variant="tonal" @click="marcarTodos(true)">Todos presentes</v-btn>
          <v-btn variant="text" @click="marcarTodos(false)">Limpar</v-btn>
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider />

    <v-progress-linear v-if="frequencia.loading" indeterminate color="primary" />

    <v-list v-if="lista.length" lines="one">
      <v-list-item v-for="crianca in lista" :key="crianca.id" :title="crianca.nome">
        <template #prepend>
          <v-avatar color="primary" variant="tonal">{{ crianca.nome.charAt(0) }}</v-avatar>
        </template>
        <template #append>
          <v-switch
            v-model="presencas[crianca.id]"
            :label="presencas[crianca.id] ? 'Presente' : 'Ausente'"
            color="success"
            hide-details
            inset
          />
        </template>
      </v-list-item>
    </v-list>

    <v-card-text v-else class="text-medium-emphasis">
      Nenhuma criança ativa nesta turma.
    </v-card-text>

    <v-divider />

    <v-card-actions class="pa-4">
      <span class="text-body-medium">
        Presentes: <strong>{{ totalPresentes }}</strong> de {{ lista.length }}
      </span>
      <v-spacer />
      <v-btn
        color="primary"
        variant="flat"
        prepend-icon="mdi-content-save-outline"
        :disabled="!lista.length"
        :loading="frequencia.saving"
        @click="salvar"
      >
        Salvar frequência
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
