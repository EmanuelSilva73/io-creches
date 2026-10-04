<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-empty-state
      icon="mdi-map-marker-question-outline"
      headline="404"
      title="Página não encontrada"
      text="O endereço acessado não existe."
    >
      <template #actions>
        <v-btn color="primary" variant="flat" :to="{ name: 'dashboard' }">Voltar ao início</v-btn>
      </template>
    </v-empty-state>
  </v-container>
</template>
