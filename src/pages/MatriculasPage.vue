<script setup>
import { computed, onMounted } from 'vue'

import { situacaoCores, situacoesMatricula } from '@/data/options'
import { useCriancasStore } from '@/stores/criancas'
import { useMatriculasStore } from '@/stores/matriculas'
import { useTurmasStore } from '@/stores/turmas'
import { useCrudPage } from '@/composables/useCrudPage'
import { formatDate, todayISO } from '@/utils/format'
import { required } from '@/utils/rules'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import FormDialog from '@/components/FormDialog.vue'
import PageHeader from '@/components/PageHeader.vue'

const store = useMatriculasStore()
const criancas = useCriancasStore()
const turmas = useTurmasStore()

onMounted(() => {
  criancas.fetchAll()
  turmas.fetchAll()
})

const emptyItem = () => ({
  criancaId: null,
  turmaId: null,
  anoLetivo: new Date().getFullYear(),
  dataMatricula: todayISO(),
  situacao: 'Pendente',
})

const {
  search,
  dialog,
  confirmDialog,
  editing,
  toDelete,
  openNew,
  openEdit,
  save,
  askDelete,
  confirmDelete,
} = useCrudPage(store, emptyItem, { label: 'Matrícula' })

const headers = [
  { title: 'Criança', key: 'crianca' },
  { title: 'Turma', key: 'turma' },
  { title: 'Ano letivo', key: 'anoLetivo' },
  { title: 'Data', key: 'dataMatricula' },
  { title: 'Situação', key: 'situacao' },
  { title: 'Ações', key: 'actions', sortable: false, align: 'end' },
]

const rows = computed(() =>
  store.items.map((matricula) => ({
    ...matricula,
    crianca: criancas.findById(matricula.criancaId)?.nome ?? '—',
    turma: turmas.findById(matricula.turmaId)?.nome ?? '—',
  })),
)

function onSave() {
  editing.value.anoLetivo = Number(editing.value.anoLetivo)
  save()
}
</script>

<template>
  <PageHeader title="Matrículas" subtitle="Matrículas por ano letivo">
    <template #actions>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="openNew">Nova matrícula</v-btn>
    </template>
  </PageHeader>

  <v-card border flat>
    <v-card-text>
      <v-text-field
        v-model="search"
        label="Buscar"
        prepend-inner-icon="mdi-magnify"
        density="compact"
        hide-details
        clearable
        max-width="360"
      />
    </v-card-text>

    <v-data-table :headers="headers" :items="rows" :search="search" :loading="store.loading">
      <template #item.dataMatricula="{ item }">{{ formatDate(item.dataMatricula) }}</template>
      <template #item.situacao="{ item }">
        <v-chip :color="situacaoCores[item.situacao]" size="small" variant="tonal">
          {{ item.situacao }}
        </v-chip>
      </template>
      <template #item.actions="{ item }">
        <v-btn
          icon="mdi-pencil"
          variant="text"
          size="small"
          title="Editar"
          @click="openEdit(store.findById(item.id))"
        />
        <v-btn
          icon="mdi-delete-outline"
          variant="text"
          size="small"
          color="error"
          title="Excluir"
          @click="askDelete(item)"
        />
      </template>
    </v-data-table>
  </v-card>

  <FormDialog
    v-model="dialog"
    :title="editing.id ? 'Editar matrícula' : 'Nova matrícula'"
    :loading="store.saving"
    @submit="onSave"
  >
    <v-row density="compact">
      <v-col cols="12">
        <v-autocomplete
          v-model="editing.criancaId"
          label="Criança"
          :items="criancas.items"
          item-title="nome"
          item-value="id"
          :rules="[required]"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          v-model="editing.turmaId"
          label="Turma"
          :items="turmas.items"
          item-title="nome"
          item-value="id"
          :rules="[required]"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="editing.anoLetivo"
          label="Ano letivo"
          type="number"
          :rules="[required]"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="editing.dataMatricula"
          label="Data da matrícula"
          type="date"
          :rules="[required]"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          v-model="editing.situacao"
          label="Situação"
          :items="situacoesMatricula"
          :rules="[required]"
        />
      </v-col>
    </v-row>
  </FormDialog>

  <ConfirmDialog
    v-model="confirmDialog"
    title="Excluir matrícula"
    :text="`Deseja excluir a matrícula de ${toDelete?.crianca}?`"
    :loading="store.saving"
    @confirm="confirmDelete"
  />
</template>
