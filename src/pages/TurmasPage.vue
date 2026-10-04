<script setup>
import { computed, onMounted } from 'vue'

import { faixasEtarias, turnos } from '@/data/options'
import { useCriancasStore } from '@/stores/criancas'
import { useTurmasStore } from '@/stores/turmas'
import { useCrudPage } from '@/composables/useCrudPage'
import { positive, required } from '@/utils/rules'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import FormDialog from '@/components/FormDialog.vue'
import PageHeader from '@/components/PageHeader.vue'

const store = useTurmasStore()
const criancas = useCriancasStore()

onMounted(() => criancas.fetchAll())

const emptyItem = () => ({
  nome: '',
  faixaEtaria: null,
  turno: null,
  capacidade: 20,
  educadora: '',
  sala: '',
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
} = useCrudPage(store, emptyItem, { label: 'Turma' })

const headers = [
  { title: 'Nome', key: 'nome' },
  { title: 'Faixa etária', key: 'faixaEtaria' },
  { title: 'Turno', key: 'turno' },
  { title: 'Educadora', key: 'educadora' },
  { title: 'Sala', key: 'sala' },
  { title: 'Ocupação', key: 'ocupacao', sortable: false },
  { title: 'Ações', key: 'actions', sortable: false, align: 'end' },
]

const rows = computed(() =>
  store.items.map((turma) => ({
    ...turma,
    ocupacao: `${criancas.porTurma(turma.id).length}/${turma.capacidade}`,
  })),
)

function onSave() {
  editing.value.capacidade = Number(editing.value.capacidade)
  save()
}
</script>

<template>
  <PageHeader title="Turmas" subtitle="Organização das turmas por faixa etária e turno">
    <template #actions>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="openNew">Nova turma</v-btn>
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
    :title="editing.id ? 'Editar turma' : 'Nova turma'"
    :loading="store.saving"
    @submit="onSave"
  >
    <v-row density="compact">
      <v-col cols="12">
        <v-text-field v-model="editing.nome" label="Nome da turma" :rules="[required]" />
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          v-model="editing.faixaEtaria"
          label="Faixa etária"
          :items="faixasEtarias"
          :rules="[required]"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-select v-model="editing.turno" label="Turno" :items="turnos" :rules="[required]" />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field v-model="editing.educadora" label="Educadora responsável" />
      </v-col>
      <v-col cols="12" sm="3">
        <v-text-field v-model="editing.sala" label="Sala" />
      </v-col>
      <v-col cols="12" sm="3">
        <v-text-field
          v-model="editing.capacidade"
          label="Capacidade"
          type="number"
          min="1"
          :rules="[required, positive]"
        />
      </v-col>
    </v-row>
  </FormDialog>

  <ConfirmDialog
    v-model="confirmDialog"
    title="Excluir turma"
    :text="`Deseja excluir a turma ${toDelete?.nome}?`"
    :loading="store.saving"
    @confirm="confirmDelete"
  />
</template>
