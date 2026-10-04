<script setup>
import { parentescos } from '@/data/options'
import { useResponsaveisStore } from '@/stores/responsaveis'
import { useCrudPage } from '@/composables/useCrudPage'
import { email, required } from '@/utils/rules'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import FormDialog from '@/components/FormDialog.vue'
import PageHeader from '@/components/PageHeader.vue'

const store = useResponsaveisStore()

const emptyItem = () => ({
  nome: '',
  cpf: '',
  parentesco: null,
  telefone: '',
  email: '',
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
} = useCrudPage(store, emptyItem, { label: 'Responsável' })

const headers = [
  { title: 'Nome', key: 'nome' },
  { title: 'CPF', key: 'cpf' },
  { title: 'Parentesco', key: 'parentesco' },
  { title: 'Telefone', key: 'telefone' },
  { title: 'E-mail', key: 'email' },
  { title: 'Ações', key: 'actions', sortable: false, align: 'end' },
]
</script>

<template>
  <PageHeader title="Responsáveis" subtitle="Pais, mães e responsáveis legais">
    <template #actions>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="openNew">Novo responsável</v-btn>
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

    <v-data-table :headers="headers" :items="store.items" :search="search" :loading="store.loading">
      <template #item.actions="{ item }">
        <v-btn
          icon="mdi-pencil"
          variant="text"
          size="small"
          title="Editar"
          @click="openEdit(item)"
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
    :title="editing.id ? 'Editar responsável' : 'Novo responsável'"
    :loading="store.saving"
    @submit="save"
  >
    <v-row density="compact">
      <v-col cols="12">
        <v-text-field v-model="editing.nome" label="Nome completo" :rules="[required]" />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field v-model="editing.cpf" label="CPF" placeholder="000.000.000-00" />
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          v-model="editing.parentesco"
          label="Parentesco"
          :items="parentescos"
          :rules="[required]"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="editing.telefone"
          label="Telefone"
          placeholder="(00) 00000-0000"
          :rules="[required]"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field v-model="editing.email" label="E-mail" type="email" :rules="[email]" />
      </v-col>
    </v-row>
  </FormDialog>

  <ConfirmDialog
    v-model="confirmDialog"
    title="Excluir responsável"
    :text="`Deseja excluir o cadastro de ${toDelete?.nome}?`"
    :loading="store.saving"
    @confirm="confirmDelete"
  />
</template>
