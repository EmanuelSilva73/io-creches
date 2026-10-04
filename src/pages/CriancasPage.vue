<script setup>
import { computed, onMounted } from 'vue'

import { sexos } from '@/data/options'
import { useCriancasStore } from '@/stores/criancas'
import { useResponsaveisStore } from '@/stores/responsaveis'
import { useTurmasStore } from '@/stores/turmas'
import { useCrudPage } from '@/composables/useCrudPage'
import { formatAge, formatDate } from '@/utils/format'
import { required } from '@/utils/rules'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import FormDialog from '@/components/FormDialog.vue'
import PageHeader from '@/components/PageHeader.vue'

const store = useCriancasStore()
const turmas = useTurmasStore()
const responsaveis = useResponsaveisStore()

onMounted(() => {
  turmas.fetchAll()
  responsaveis.fetchAll()
})

const emptyItem = () => ({
  nome: '',
  dataNascimento: '',
  sexo: null,
  turmaId: null,
  responsavelId: null,
  alergias: '',
  observacoes: '',
  ativo: true,
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
} = useCrudPage(store, emptyItem, { label: 'Criança' })

const headers = [
  { title: 'Nome', key: 'nome' },
  { title: 'Nascimento', key: 'dataNascimento' },
  { title: 'Idade', key: 'idade', sortable: false },
  { title: 'Turma', key: 'turma' },
  { title: 'Responsável', key: 'responsavel' },
  { title: 'Situação', key: 'ativo' },
  { title: 'Ações', key: 'actions', sortable: false, align: 'end' },
]

const rows = computed(() =>
  store.items.map((crianca) => ({
    ...crianca,
    turma: turmas.findById(crianca.turmaId)?.nome ?? '—',
    responsavel: responsaveis.findById(crianca.responsavelId)?.nome ?? '—',
  })),
)
</script>

<template>
  <PageHeader title="Crianças" subtitle="Cadastro das crianças atendidas">
    <template #actions>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="openNew">Nova criança</v-btn>
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

    <v-data-table
      :headers="headers"
      :items="rows"
      :search="search"
      :loading="store.loading"
      item-value="id"
    >
      <template #item.dataNascimento="{ item }">{{ formatDate(item.dataNascimento) }}</template>
      <template #item.idade="{ item }">{{ formatAge(item.dataNascimento) }}</template>
      <template #item.ativo="{ item }">
        <v-chip :color="item.ativo ? 'success' : 'grey'" size="small" variant="tonal">
          {{ item.ativo ? 'Ativa' : 'Inativa' }}
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
    :title="editing.id ? 'Editar criança' : 'Nova criança'"
    :loading="store.saving"
    @submit="save"
  >
    <v-row density="compact">
      <v-col cols="12">
        <v-text-field v-model="editing.nome" label="Nome completo" :rules="[required]" />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="editing.dataNascimento"
          label="Data de nascimento"
          type="date"
          :rules="[required]"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-select v-model="editing.sexo" label="Sexo" :items="sexos" :rules="[required]" />
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          v-model="editing.turmaId"
          label="Turma"
          :items="turmas.items"
          item-title="nome"
          item-value="id"
          clearable
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-autocomplete
          v-model="editing.responsavelId"
          label="Responsável"
          :items="responsaveis.items"
          item-title="nome"
          item-value="id"
          :rules="[required]"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="editing.alergias" label="Alergias / restrições alimentares" />
      </v-col>
      <v-col cols="12">
        <v-textarea v-model="editing.observacoes" label="Observações" rows="2" auto-grow />
      </v-col>
      <v-col cols="12">
        <v-switch v-model="editing.ativo" label="Criança ativa" color="primary" hide-details />
      </v-col>
    </v-row>
  </FormDialog>

  <ConfirmDialog
    v-model="confirmDialog"
    title="Excluir criança"
    :text="`Deseja excluir o cadastro de ${toDelete?.nome}?`"
    :loading="store.saving"
    @confirm="confirmDelete"
  />
</template>
